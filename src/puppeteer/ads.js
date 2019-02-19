const puppeteer = require('puppeteer');
const { autoScroll } = require('./browserUtils');
const isBlackListed = require('./filters/blackList');
const detectAdServer = require('./detectors/detectors');
const URL = require('url').URL;

async function visitPage(type, url, level, page) {
    console.log(`\nNavigating to: ${type} with url: ${url}\n\n`);
    // await page.goto(pageUrl, { waitUntil: 'load' });
    await page.goto(url);
    // await page.click('.cookiedisclaimer-accept');

    return await autoScroll(page);
}


async function getArticleUri(page) {
    return await page.evaluate(() => {
        const element = document.querySelector('a[href*="article"]');
        return {
            url: !!element? element.href : null,
            level: 1,
            type: 'article'
        };
    });
}

async function getSectionUri(page) {
    return await page.evaluate(() => {
        const element = document.querySelector(`a[href*="${window.location.href}"]`);
        return {
            url: !!element? element.href : null,
            level: 1,
            type: 'section'
        };
    });
}

async function getInventoryForPage(homePage, inventory) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        let level = 0;
        const page = await browser.newPage();

        page.setViewport({ width: 1280, height: 926 });

        await page.setRequestInterception(true);

        page.on('request', async interceptedRequest => {
            const url = interceptedRequest.url();

            if (isBlackListed(url)) {
                // TODO commented for visual aid. Uncomment
                // interceptedRequest.abort();
            } else {
                const adServer = detectAdServer(url);

                if (adServer) {
                    await inventory.addAdRequest(adServer, url, level, page);
                }
            }
            interceptedRequest.continue();

        });


        await visitPage('homePage', homePage, level, page);

        // const section = await getSectionUri(page);
        // level = section.level;
        //
        // await visitPage(section.type, section.url, section.level, page);
        //
        // const articlePage = await getArticleUri(page);
        // level = articlePage.level;
        //
        // await visitPage(articlePage.type, articlePage.url, articlePage.level, page);



        // await page.screenshot({
        //     path: 'tenantPage.png',
        //     fullPage: true
        // });
    } catch (e) {
        console.log('There has been an error', e);
    }

    browser.close();

    return inventory;
}


module.exports = {
    getInventoryForPage
};
