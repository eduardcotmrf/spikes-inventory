const webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');

const { driverUtil, logEntries } = require('web-log');

let options = new chrome.Options();
options.addArguments('--headless');
let logging_prefs = new webdriver.logging.Preferences();
logging_prefs.setLevel(webdriver.logging.Type.PERFORMANCE, webdriver.logging.Level.INFO);
options.setLoggingPrefs(logging_prefs);

var driver = new webdriver.Builder().
usingServer('http://172.23.237.235:5555/wd/hub').
withCapabilities(options).
build();
 
var getLogs = async () => {
    await driver.get('http://www.elconfidencial.com');
    let logs = await driver.manage().logs().get('performance')
    console.log(logs);
}

getLogs();


driver.get('http://www.elconfidencial.com')
    .then( () => {
        return logEntries.getLogEntries({ driver })
    })
    .then( (entries) => {
        let filteredEntries = logEntries.filterEntries({
            entries,
            urlPart: 'doubleclick',
            method: 'Network.requestWillBeSent'
        });

        console.log(filteredEntries.length);
    
        filteredEntries.forEach((dfp) => {
            console.log(dfp.message.params.request.url);
        });
    }).catch((err) => {
        console.log('error', err);
});;
