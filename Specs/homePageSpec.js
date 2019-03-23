'use strict'

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

  /*
    some defualt variables for the user's name and password
  */
  var userNameVar = "test";
  var userPasswordVar = "test";

  /*
  first step is to login
  */
  it("first step is to check the successful log in ",function(){

    browser.get('http://localhost:4200/login'); // redirect the browser to the login page
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
    allInputs.get(0).sendKeys(userNameVar);
    allInputs.get(1).sendKeys(userPasswordVar);
    /*
    send click action the sign button
    */
    signInButton.click();

  });



  /*
  check the successful action of clicking on the logo of the website in the upper navigation bar
  */
  it("Checking website logo button",function(){

    logoButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');

  });

  /*
  this function will redirect the browser to the home page after executing each test case
  */
  beforeEach(function(){

    browser.get('http://localhost:4200/home');

  });

  /*
  check the successful action of clicking on the home button in the upper navigation bar
  */
  it("Checking home page button",function(){

    homePageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');

  });

  /*
  check the successful action of clicking on the profile button in the upper navigation bar
  */
  it("Checking the successful transfer from home page to the profile page ",function(){

    profilePageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/profile');

  });

  /*
  check the successful action of clicking on the my books button in the upper navigation bar
  */
  it("Checking the successful transfer from home page to the my books page",function(){

    myBooksPageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/myBooks');

  });

  /*
  check the successful action of clicking on the followers button in the upper navigation bar
  */
  it("Checking the successful transfer from home page to the followers page",function(){

    followersPageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/followers');

  });

  /*
  check the successful action of clicking on the following button in the upper navigation bar
  */
  it("Checking the successful transfer from home page to the following page",function(){

    followingPageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/following');

  });

});
