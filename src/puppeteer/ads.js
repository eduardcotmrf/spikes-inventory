
const { autoScroll } = require('./browserUtils');
const isBlackListed = require('./filters/blackList');
const findAdType = require('./filters/adFilter');

async function getInventoryForPage(browser, pageUrl, inventory, level) {
    try {
        const page = await browser.newPage();
        page.setViewport({ width: 1280, height: 926 });
        await page.setRequestInterception(true);

        page.on('request', interceptedRequest => {
            const url = interceptedRequest.url();

            if (isBlackListed(url)) {
                // interceptedRequest.abort();
            } else {
                const adType = findAdType(url);

                if (adType) {
                    inventory.addAdRequest(adType, url, level);
                }

            }
            interceptedRequest.continue();

        });
        // await page.goto(pageUrl, { waitUntil: 'load' });
        await page.goto(pageUrl);
        // await page.click('.cookiedisclaimer-accept');

        await autoScroll(page);

        // await page.screenshot({
        //     path: 'tenantPage.png',
        //     fullPage: true
        // });
    } catch (e) {
        console.log('There has been an error', e);
    }

    // browser.close();

    return inventory;
}


module.exports = {
    getInventoryForPage
};
