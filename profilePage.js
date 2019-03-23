'use strict'

describe('First test in Protractor', function ()  {


  var signInButton = element(by.id("signInButton"));
  var profileButton = element(by.id("profile"));
  var allDivs = element.all(by.tagName('div'));
  var allInputs = element(by.className("row")).all(by.tagName('input'));
  var testVar = element(by.id("firstContainer"));
  var userNameVar = "Ayman";
  var userPasswordVar = 'test07';
  var logOutButton = element(by.id("logOut"));

  var userNameProfilePage = element(by.className('col-md-8')).all(by.tagName('b'));
  var bookshelvesButton = element(by.id("bookShelvesmore"));

  beforeEach(function(){


  });

  it("first step is to check the successful log in ",function(){

    browser.get('http://localhost:4200/');
    allInputs.get(0).sendKeys(userNameVar);
    allInputs.get(1).sendKeys(userPasswordVar);
    signInButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/home');

  });


  it("Checking the profile name in the details section to be the same as the user name",function(){

    var userNameDetail = element(by.className('userName'));
    profileButton.click();
    expect(userNameDetail.getText()).toEqual(userNameVar + ' ( edit profile )');

  });

  it("Checking the profile name in the book shelf section to be the same as the user name",function(){

    expect(userNameProfilePage.get(0).getText()).toEqual(userNameVar + '\'S BOOKSHELVES ');

  });

  it("Checking the profile name in the currently reading section to be the same as the user name",function(){

    expect(userNameProfilePage.get(1).getText()).toEqual(userNameVar + ' IS CURRENTLY READING ');

  });


  it("Checking the profile name in the recent updates section to be the same as the user name",function(){

    expect(userNameProfilePage.get(2).getText()).toEqual(userNameVar + '\'S RECENT UPDATES ');

  });

  it("Checking the profile name in the following section to be the same as the user name",function(){

    var userNameProfileFollowingList = element(by.className('col-md-4')).element(by.tagName('b'));
    expect(userNameProfileFollowingList.getText()).toEqual(userNameVar + ' IS FOLLOWING ');

  });

  it("Checking the successful transfer from profile page to the myBooks page",function(){

    expect(bookshelvesButton.getText()).toEqual('More..');

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
