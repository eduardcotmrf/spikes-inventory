const fs = require('fs');
const path = require('path');

const CDP = require('chrome-remote-interface');
const puppeteer = require('puppeteer');

const isBlackListed = require('./filters/blackList');
const findAdType = require('./filters/adFilter');
const Inventory = require('./inventory/Inventory');

function saveInventoryJson(inventory) {
    fs.writeFile(path.resolve(__dirname, './result/inventory.json'), JSON.stringify(inventory.getInventory(), null, '\t'), (err) => {
        if (err) throw err;
        console.log('Inventory saved!');
    });
}

// From: https://github.com/chenxiaochun/blog/issues/38
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
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
    let position = -1;
    page.on('request', interceptedRequest => {
        const url = interceptedRequest.url();

        if (isBlackListed(url)) {
            interceptedRequest.abort();
        } else {
            const adType = findAdType(url);

            if (adType) {
                inventory.addAdRequest(adType, url, ++position);
            }

            interceptedRequest.continue();
        }

    });

    await page.goto('https://www.elconfidencial.com/espana/cataluna/2019-02-11/puigdemont-berlinale-documental-netflix-cataluna_1818374/', {waitUntil: 'load'});

    await page.click('.cookiedisclaimer-accept');

    await page.waitFor(1000);

    await autoScroll(page);


    await browser.close();

    // await page.screenshot({
    //     path: 'tenantPage.png',
    //     fullPage: true
    // });

    saveInventoryJson(inventory);

  })();

