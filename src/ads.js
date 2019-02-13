const fs = require('fs');
const path = require('path');

const CDP = require('chrome-remote-interface');
const puppeteer = require('puppeteer');

const isBlackListed = require('./filters/blackList');
const findAdType = require('./filters/adFilter');
const Inventory = require('./inventory/Inventory');

function saveInFile(fileName, content) {
    fs.writeFile(path.resolve(__dirname, `./result/${fileName}`),content, (err) => {
        if (err) throw err;
        console.log(`${fileName} saved!`);
    });
}

// From: https://github.com/chenxiaochun/blog/issues/38
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 200;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        });
    });
}


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });

    await page.setRequestInterception(true);

    const inventory = new Inventory();
    let position = 0;
    page.on('request', interceptedRequest => {
        const url = interceptedRequest.url();

        if (isBlackListed(url)) {
            // interceptedRequest.abort();
        } else {
            const adType = findAdType(url);

            if (adType) {
                inventory.addAdRequest(adType, url, ++position);
            }

        }
            interceptedRequest.continue();

    });

    // await page.goto('https://adage.com/article/news/news-apple-valentine-s-day-buzzfeed-wake-call/316626/', { waitUntil: 'load' });
    await page.goto('https://adage.com/article/news/news-apple-valentine-s-day-buzzfeed-wake-call/316626/');

    // await page.click('.cookiedisclaimer-accept');

    await autoScroll(page);


    await browser.close();

    // await page.screenshot({
    //     path: 'tenantPage.png',
    //     fullPage: true
    // });

    saveInFile('inventory.json',  JSON.stringify(inventory.getInventory(), null, '\t'));
    saveInFile('urls.json',  JSON.stringify(inventory.getUrls(), null, '\t'));

  })();

