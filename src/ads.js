const URL = require('url');
const CDP = require('chrome-remote-interface');
const puppeteer = require('puppeteer');



const BLACK_LISTED_FILES = require('./filters/blacklistFiles');
const isAnAdRequest = require('./filters/adFilter');
const Inventory = require('./inventory/inventory');

const shouldAbort = (url) => {
    let pathName = (URL.parse(url)).pathname;

    return BLACK_LISTED_FILES.some((urlEnd) => pathName.endsWith(urlEnd));
};



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.setRequestInterception(true);
    let position = -1;

    page.on('request', interceptedRequest => {
        const url = interceptedRequest.url();
        // if (shouldAbort(url)) {
        //     interceptedRequest.abort();
        // } else
        if (isAnAdRequest(url)) {
            Inventory.addAdRequest(url, ++position);
            // interceptedRequest.abort();
        }
        // else {
        //     interceptedRequest.continue();
        // }
    });

    await page.goto('https://www.elconfidencial.com/espana/cataluna/2019-02-11/puigdemont-berlinale-documental-netflix-cataluna_1818374/');

    await page.click('button.cookiedisclaimer-accept');

    await page.evaluate(_ => {
        window.scrollTo(0,document.body.scrollHeight);
    });


    // await page.screenshot({
    //     path: 'tenantPage.png',
    //     fullPage: true
    // });

    await browser.close();

    Inventory.createInventory();

  })();
