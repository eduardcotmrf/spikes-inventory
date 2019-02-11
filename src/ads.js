const CDP = require('chrome-remote-interface');
const puppeteer = require('puppeteer');


const ads = [];
let position = 0;

function addAdRequest(url) {
    if (url.indexOf('doubleclick.net/gampad/ads') != -1 ) {
        console.log(++position, url);
    }
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('request', interceptedRequest => {
        //TODO abortar totes les peticions de css,img, i adserver només qdarme amb la petició
        addAdRequest(interceptedRequest.url());
    });

    await page.goto('https://www.elconfidencial.com');

    await page.click('button.cookiedisclaimer-accept');

    await page.evaluate(_ => {
        window.scrollTo(0,document.body.scrollHeight);
    });

    await page.screenshot({path:"example.png"});
  
    //await browser.close()
  })();