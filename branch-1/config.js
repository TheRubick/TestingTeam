var HtmlScreenshotReporter = require('protractor-jasmine2-html-reporter');

var jasmineReporters = require('jasmine-reporters');

var reportsDirectory  = './reports';

var  dashboardReportDirectory = reportsDirectory + '/dashboardReport';

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [/*'Specs/signInSpec.js'/*,*/ 'Specs/signUpSpec.js',/* 'Specs/followingSpec.js',
         'Specs/followersSpec.js', 'Specs/bookReviewSpec.js'*/],
	multiCapabilities: [
    {'browserName': 'chrome'},
    //{'browserName': 'firefox'},
  ],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 50000
  },
  allScriptsTimeout: 50000,

  maxSessions: 1,


onPrepare: function () {


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
        /*
		xml report generated for dashboard
		*/
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({

            consolidateAll: true,

            savePath: reportsDirectory + '/xml',

            filePrefix: 'xmlOutput'

        }));



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

};
