'use strict'

describe('First test in Protractor', function ()  {


  var signInButton = element(by.id("signInButton"));
  var homePageButton = element(by.id("home"));
  var logoButton = element(by.id("Readholic"));
  var profilePageButton = element(by.id("profile"));
  var myBooksPageButton = element(by.id("myBooks"));
  var followersPageButton = element(by.id("followers"));
  var followingPageButton = element(by.id("following"));

  var allDivs = element.all(by.tagName('div'));
  var allInputs = element(by.className("row")).all(by.tagName('input'));
  var testVar = element(by.id("firstContainer"));
  var userNameVar = "Ayman";
  var userPasswordVar = 'test07';
  var logOutButton = element(by.id("logOut"));

  var userNameProfilePage = element(by.className('col-md-8')).all(by.tagName('b'));
  var bookshelvesButton = element(by.id("bookShelvesmore"));


  it("first step is to check the successful log in ",function(){

    browser.get('http://localhost:4200/');
    allInputs.get(0).sendKeys(userNameVar);
    allInputs.get(1).sendKeys(userPasswordVar);
    signInButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/home');

  });

  beforeEach(function(){

    browser.get('http://localhost:4200/home');

  });

  it("Checking website logo button",function(){

    logoButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');

  });

  it("Checking home page button",function(){

    homePageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');

  });

  it("Checking the successful transfer from home page to the profile page ",function(){

    profilePageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/profile');

  });

  it("Checking the successful transfer from home page to the my books page",function(){

    myBooksPageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/myBooks');

  });

  it("Checking the successful transfer from home page to the followers page",function(){

    followersPageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/followers');

  });

  it("Checking the successful transfer from home page to the followering page",function(){

    followingPageButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/following');

  });

  it("Checking the successful log out and return to the login page",function(){

    browser.get('http://localhost:4200/home');
    logOutButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');

  });

  ///
/*
  it("second step to test",function(){
    browser.get('https://www.goodreads.com/user/show/94574000-therubick');
    expect(profileName.getText()).toEqual('TheRubick (edit profile)');
  });


  it("second step to test",function(){
      var y = element.all(by.css('.items li'));
      expect(y.first().getText()).toEqual("First");
      expect(y.count()).toEqual(4);

  });

  it("third test",function(){
      var y = element.all(by.css('.items li'));
      expect(y.get(3).getText()).toBe("Third");

  });

  */

});
