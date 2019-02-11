var webdriver = require("selenium-webdriver");
var Capabilities = webdriver.Capabilities;
var Builder = webdriver.Builder;
var By = webdriver.By;

var SeleniumSDK = require("eyes.selenium");
var Eyes = SeleniumSDK.Eyes;

//Runs different tests based on CLI input such as "part1", "part2" and so on.
var testSelector = require("./testSelector.js");

// Open a Chrome browser.
var driver = new Builder().withCapabilities(Capabilities.chrome()).build();

// Initialize the eyes SDK and set your private API key.
var eyes = new Eyes();

//⚠️️️  Please set the APPLITOOLS_API_KEY environment variable
//on Mac: export APPLITOOLS_API_KEY='YOUR_API_KEY'
//on windows: set APPLITOOLS_API_KEY='YOUR_API_KEY'
//Note: You can get your API key by logging into Applitools | Click on the Person icon (top-right corner) | Click on the "My API key" menu
eyes.setApiKey("8B9VGnQJJ1Hd109uVi5jMCFI7MOfrtvlidcdx1FLmQBy4110");

//scroll the entire page
eyes.setForceFullPageScreenshot(true);

try {
  // Start the test and set the browser's viewport size.
  eyes.open(driver, testSelector.appName, testSelector.testName, {
    width: testSelector.viewportWidth,
    height: testSelector.viewportHeight
  });

  // Navigate the browser to the "hello world!" web-site.
  driver.get(testSelector.url);

  // Visual checkpoint #1.
  eyes.checkWindow(testSelector.windowName);

  // End the test.
  eyes.close(false);
} finally {
  // Close the browser.
  driver.quit();

  // If the test was aborted before eyes.close was called ends the test as aborted.
  eyes.abortIfNotClosed();
}