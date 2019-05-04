
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
var args = arguments;

// queue 100ms wait
origFn.call(browser.driver.controlFlow(), function() {
  return protractor.promise.delayed(500);
});

return origFn.apply(browser.driver.controlFlow(), args);
};

'use strict'
  /*
  test scripts for testing the home page functionailites
  */

describe('Checking the Home page Functionalities', function ()  {

  /*
  variables assigned with the buttons locators in the home page
  */
  var logoButton = element(by.id("Readholic"));
  var homePageButton = element(by.id("home"));
  var profilePageButton = element(by.id("profile"));
  var myBooksPageButton = element(by.id("myBooks"));
  var followersPageButton = element(by.id("followers"));
  var followingPageButton = element(by.id("following"));
  var followButton = element(by.id("followButton"));
  var aboutUsButton = element(by.id("aboutUs"));
  var dropDownButton = element(by.id("buttonColor"));

  /*
    some defualt variables for the user's name and password
  */
  var userNameVar = "ta7a";
  var userEmailVar = "ta7a@yahoo.com";
  var userPasswordVar = "password";

  /*
  first step is to login
  */
  it("first step is to check the successful log in ",function(){

    browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/'); // redirect the browser to the login page
    /*
    contain the locator through which it can access the sign in button
    */
    var signInButton = element(by.id("signInButton"));
    /*
    contain the locators which can access the username and the password inputs
    */
    var allInputs = element(by.className("row")).all(by.tagName('input'));
    /*
    assigning the input of the username and password fields by the declared variables above
    */
    allInputs.get(0).sendKeys(userEmailVar);
    allInputs.get(1).sendKeys(userPasswordVar);
    /*
    send click action the sign button
    */
    signInButton.click();

  });


  /*
  check the successful action of clicking on the home button in the upper navigation bar
  */
  it("Checking home page button",function(){

    homePageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/home');

  });

  /*
  check the successful action of clicking on the logo of the website in the upper navigation bar
  */
  it("Checking website logo button",function(){

    logoButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/home');

  });

  // /*
  // check the successful action of clicking on the profile button in the upper navigation bar
  // */
  // it("Checking the successful transfer from home page to the profile page ",function(){
  //
  //   profilePageButton.click();
  //   expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/profile');
  //
  // });
  //
  //
  // /*
  // check the successful action of clicking on the followers button in the upper navigation bar
  // */
  // it("Checking the successful transfer from home page to the followers page",function(){
  //
  //   followersPageButton.click();
  //   expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/followers');
  //
  // });
  //
  // /*
  // check the successful action of clicking on the following button in the upper navigation bar
  // */
  // it("Checking the successful transfer from home page to the following page",function(){
  //
  //   followingPageButton.click();
  //   expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/following');
  //
  // });
  //
  // /*
  // check the successful action of clicking on the aboutUs button in the upper navigation bar
  // */
  // it("Checking the successful transfer from home page to the AboutUS page",function(){
  //
  //   aboutUsButton.click();
  //   expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/Aboutus');
  //
  // });
  //
  //
  // /*
  // check the successful action of clicking on the my books button in the upper navigation bar
  // */
  // it("Checking the successful transfer from home page to the my books page",function(){
  //
  //   myBooksPageButton.click();
  //   expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/myBooks');
  //
  // });
  //
  // /*
  // check the successful action of clicking on the follow button to follow one of the users
  // */
  //
  // /*
  // Checking the appearance of unfollow word after pressing on the follow button
  // */
  //
  // it("Checking the appearance of unfollow word ",function(){
  //
  //   browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/'); // redirect the browser to the home page
  //   followButton.click();
  //   expect(followButton.getText()).toEqual('Unfollow ' + userNameVar);
  //
  // });
  //
  // /*
  // Checking the appearance of follow word after pressing on the unfollow button
  // */
  //
  // it("Checking the appearance of follow word ",function(){
  //
  //   followButton.click();
  //   expect(followButton.getText()).toEqual('follow ' + userNameVar);
  //
  // });
  //
  // /*
  // check the drop menu function : read , want to read , currently reading
  // */
  //
  // /*
  // Checking the appearance of \"Read\" after pressing on the Read from the drop menu
  // */
  //
  // it("Checking the appearance of \"Read\" ",function(){
  //
  //   dropDownButton.click();
  //   var btnStatus = element.all(by.tagName('span')).get(1);
  //   expect(btnStatus.getText()).toEqual('Read');
  //
  // });
  //
  // /*
  // Checking the appearance of \"Want to Read\" after pressing on the Want to Read from the drop menu
  // */
  //
  // it("Checking the appearance of \"Want to Read\" ",function(){
  //
  //   dropDownButton.click();
  //   var btnStatus = element.all(by.tagName('span')).get(1);
  //   expect(btnStatus.getText()).toEqual('Want to Read');
  //
  // });
  //
  // /*
  // Checking the appearance of \"Currently reading\" after pressing on the Currently Reading from the drop menu
  // */
  //
  // it("Checking the appearance of \"Currently reading\" ",function(){
  //
  //   dropDownButton.click();
  //   var btnStatus = element.all(by.tagName('span')).get(1);
  //   expect(btnStatus.getText()).toEqual('Currently Reading');
  //
  // });

});
