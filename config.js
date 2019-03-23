var HtmlScreenshotReporter = require('protractor-jasmine2-html-reporter');

var jasmineReporters = require('jasmine-reporters');



var reportsDirectory  = './reports';

var  dashboardReportDirectory = reportsDirectory + '/dashboardReport';

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['Specs/*Spec.js'],

  //baseUrl: 'file:///C:/Users/Lenovo/Desktop/Super%20Calculator.html',

/*
  onPrepare: function()
  {
    // By default, Protractor use data:text/html,<html></html> as resetUrl, but
   // location.replace from the data: to the file: protocol is not allowed
   // (we'll get ‘not allowed local resource’ error), so we replace resetUrl with one
   // with the file: protocol (this particular one will open system's root folder)
   browser.ignoreSynchronization = true;
   browser.waitForAngular(true);
   browser.sleep(1000);
   browser.resetUrl = 'file:///';

 },

  jasmineNodeOpts: {
    showingColors: true, // Use colors in the command line report.
  }
*/

onPrepare: function () {


  /*
  browser.ignoreSynchronization = true;
  browser.waitForAngular(true);
  browser.sleep(1000);

  */

        // xml report generated for dashboard

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
