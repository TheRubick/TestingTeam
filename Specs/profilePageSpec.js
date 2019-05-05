'use strict'

/*
Making delay

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
var args = arguments;

// queue 100ms wait
origFn.call(browser.driver.controlFlow(), function() {
  return protractor.promise.delayed(500);
});

return origFn.apply(browser.driver.controlFlow(), args);
};
*/

/*
test scripts for testing the home page functionailites
*/
describe('Checking the Profile page Functionalities', function ()  {

  /*
  variables assigned with the locators in the Profile page
  */
  var profileButton = element(by.id("profile"));
  var userNameProfilePage = element(by.className('col-md-8')).all(by.tagName('b'));
  var bookshelvesButton = element(by.id("bookShelvesmore"));

  /*
    some defualt variables for the user's name and password
  */
  var userNameVar = "Muhamed";
  var userPasswordVar = "password";


  /*
  Go to the profile page
  */
  it("redirect to profile",function(){

    /*
    redirect the browser to the profile page
    */
    profileButton.click();

  });

  /*
  Checking the profile name in the details section to be the same as the user name
  */
  it("Checking the profile name in the details section",function(){

    /*
    contain the locator which can access the profile's name in the details section
    */
    var userNameDetail = element(by.className('userName'));
    /*
    send click action the profile button from the upper navigation bar
    */
    profileButton.click();
    /*
    expect the value of the profile's name in the details section to be the same of the username
    */
    expect(userNameDetail.getText()).toEqual(userNameVar + ' ( edit profile )');

  });

  /*
  Checking the profile name in the book shelf section to be the same as the user name
  */
  it("Checking the profile name in the book shelf section",function(){

    /*
    expect the value of the profile's name in the book shelf section to be the same of the username
    */
    expect(userNameProfilePage.get(0).getText()).toEqual(userNameVar + '\'S BOOKSHELVES');

  });

  /*
  Checking the profile name in the book shelf section to be the same as the user name
  */
  it("Checking the follower",function(){

    /*
    expect the value of the profile's name in the book shelf section to be the same of the username
    */
    element(by.id("followName")).click();
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/profile/3');

  });

  /*
  Checking the successful transfer from profile page to the myBooks page
  */

  it("Should be directed to myBooks page",function(){

    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/profile/");
    /*
    send click action to the "More.." href
    */
    bookshelvesButton.click();
    /*
    check if the browser is redirected to myBooks page or not
    */
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/myBooks/342');

  });

});
