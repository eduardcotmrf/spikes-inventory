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


(async () => {
	let inventory = new Inventory();
	// const browser = await puppeteer.launch({
	// 	headless: false,
	// 	// args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito'],
	// 	args: ['--no-sandbox', '--disable-setuid-sandbox'],
	// });
	const homePage = 'https://listindiario.com/economia/2019/02/19/554256/gobierno-comunica-posposicion-firma-del-pacto-electrico';

	try {
		// const pagesToVisit = await extractPagesToVisit(browser, 'https://listindiario.com/');
		// const pageUrl = 'https://adage.com/article/news/news-apple-valentine-s-day-buzzfeed-wake-call/316626/';

		await getInventoryForPage(homePage, inventory);

		saveInFile('inventory.json',  JSON.stringify(inventory.getInventory(), null, '\t'));
		saveInFile('urls.json',  JSON.stringify(inventory.getUrls(), null, '\t'));

	} catch (e) {
		console.log('There has been an error', e);
	}

})();
