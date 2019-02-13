const fs = require('fs');
const path = require('path');
const CDP = require('chrome-remote-interface');
const puppeteer = require('puppeteer');

const Inventory = require('./inventory/Inventory');
const { getInventoryForPage } = require('./ads');

function saveInFile(fileName, content) {
	fs.writeFile(path.resolve(__dirname, `./result/${fileName}`),content, (err) => {
		if (err) throw err;
		console.log(`${fileName} saved!`);
	});
}



async function extractPagesToVisit(browser, homeUrl) {
	const result = {
		home: {
			url: homeUrl,
			level: 0
		},
		section: {
			url: null,
			level: 0
		},
		article: {
			url: null,
			level: 1
		}
	};

	const page = await browser.newPage();
	await page.goto(homeUrl);

	result.article.url = await page.evaluate(() => {
		const element = document.querySelector('a[href*="article"]');
		return !!element? element.href : null;
	});

	result.section.url = await page.evaluate(() => {
		const element = document.querySelector(`a[href*="${window.location.href}"]`);
		return !!element? element.href : null;
	});

	// browser.close();

	return result;
}

async function processArray(object) {
	for (const item of array) {
		await delayedLog(item);
	}
	console.log('Done!');
}

(async () => {
		let inventory = new Inventory();
		const browser = await puppeteer.launch({
			headless: false,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		// const pageUrl = 'https://adage.com/article/news/news-apple-valentine-s-day-buzzfeed-wake-call/316626/';


	try {
		// const pagesToVisit = await extractPagesToVisit(browser, 'https://adage.com');
		const pagesToVisit = await extractPagesToVisit(browser, 'https://listindiario.com/');

		console.log('Pages to visit: ');
		console.log(pagesToVisit);
		console.log('\n');

		Object.keys(pagesToVisit).forEach(async key => {
			let entry = pagesToVisit[key];

			if (entry.url) {
				await getInventoryForPage(browser, entry.url, inventory, entry.level);
			} else {
				console.log(`Could not extract inventory for ${key} as does not have url defined`);
			}
		});

		// await getInventoryForPage(browser, pageUrl, inventory, level);



		saveInFile('inventory.json',  JSON.stringify(inventory.getInventory(), null, '\t'));
		saveInFile('urls.json',  JSON.stringify(inventory.getUrls(), null, '\t'));

	} catch (e) {
		console.log('There has been an error', e);
	}
	browser.close();

})();
