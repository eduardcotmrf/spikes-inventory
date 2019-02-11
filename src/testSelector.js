const testname = process.argv[2];

var baseUrl = "https://demo.applitools.com/";
//var baseUrl = "file:///Users/raja.rao/apps/acme-demo-app/";

//default for "part1"
let testsToRun = {
  url: baseUrl + "index.html",
  appName: "Demo app",
  windowName: "Login Page",
  testName: "Login Page",
  goto2ndPage: false,
  viewportWidth: 1200,
  viewportHeight: 700
};

if (testname === "part2") {
  testsToRun = {
    url: baseUrl + "index_v2.html",
    appName: "Demo app",
    windowName: "Login Page",
    testName: "Login Page",
    goto2ndPage: false,
    viewportWidth: 1200,
    viewportHeight: 700
  };
}

//create baseline for the app.html
if (testname === "part3") {
  testsToRun = {
    url: baseUrl + "app.html",
    appName: "Demo app",
    windowName: "Main app page",
    testName: "Main app page test",
    goto2ndPage: false,
    viewportWidth: 1200,
    viewportHeight: 700
  };
}

//Run tests on version 2 of the app(app_v2.html)
if (testname === "part4") {
  testsToRun = {
    url: baseUrl + "app_v2.html",
    appName: "Demo app",
    windowName: "Main app page",
    testName: "Main app page test",
    goto2ndPage: false,
    viewportWidth: 1200,
    viewportHeight: 700
  };
}
if (
  testname !== "part1" &&
  testname !== "part2" &&
  testname !== "part3" &&
  testname !== "part4"
) {
  console.log(
    "Invalid test part name. Valid part names are: 'part1', 'part2', 'part3', 'part4'"
  );
  process.exit(0);
}
console.log("Running..", testname);
console.log("Test app URL:", testsToRun.url);
console.log("Application name:", testsToRun.appName);
console.log("Test page name:", testsToRun.windowName);
console.log("Viewport width:", testsToRun.viewportWidth);
console.log("Viewport height:", testsToRun.viewportHeight);

module.exports = testsToRun;