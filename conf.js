
var { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var jasmineReporters = require('jasmine-reporters');

var reportsDirectory = './reports';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';
var detailsReportDirectory = reportsDirectory + '/detailReport';

var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
  dest: detailsReportDirectory,
  filename: 'E2ETestingReport.html',
  reportTitle: "E2E Testing Report",
  showSummary: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
});

exports.config = {
  directConnect: true,
  specs: [/*'Specs/signInSpec.js', 'Specs/signUpSpec.js', 'Specs/followingSpec.js',*/
         'Specs/followersSpec.js'/*, 'Specs/bookReviewSpec.js'*/],
	multiCapabilities: [
    // { 'browserName': 'firefox' },
    { 'browserName': 'chrome' }
  ],
  
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 100000
  },
  allScriptsTimeout: 100000,

  maxSessions: 1,

  beforeLaunch: function () {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function () {
    // xml report generated for dashboard
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: reportsDirectory + '/xml',
      filePrefix: 'xmlOutput'
    }));

    
    // var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    var origFn = browser.driver.controlFlow().execute;

    browser.driver.controlFlow().execute = function () {
      var args = arguments;
    
      /*
      queue 200ms wait
      */
      origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(200);
      });
    
      return origFn.apply(browser.driver.controlFlow(), args);
    };

    //Test Summary report creation
    jasmine.getEnv().addReporter(ScreenshotAndStackReporter);

    var fs = require('fs-extra');
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    }

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

    //console logs configurations
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none) 
      displaySuccessesSummary: false, // display summary of all successes after execution 
      displayFailuresSummary: true,   // display summary of all failures after execution 
      displayPendingSummary: true,    // display summary of all pending specs after execution 
      displaySuccessfulSpec: true,    // display each successful spec 
      displayFailedSpec: true,        // display each failed spec 
      displayPendingSpec: false,      // display each pending spec 
      displaySpecDuration: false,     // display each spec duration 
      displaySuiteNumber: false,      // display each suite number (hierarchical) 
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      },
      customProcessors: []
    }));

  },

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: dashboardReportDirectory,
        outputFilename: 'index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
    });
  },

  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
};
