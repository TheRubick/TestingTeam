
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
var args = arguments;

// queue 100ms wait
origFn.call(browser.driver.controlFlow(), function() {
  return protractor.promise.delayed(300);
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
  var searchBookButton = element(by.id("searchbutton"));
  var radioButtons = element.all(by.tagName("input"));
  var searchBar = element(by.id("searchBoxInput"));
  var searchBoxButton = element.all(by.tagName("button")).get(2);
  var rateButton = element(by.id("rateBook")).all(by.css(".star"));
  var statusReadButton = element.all(by.id("buttonColor"));
  var aboutUsButton = element(by.id("aboutUs"));
  var dropList = element.all(by.className("dropdown-item"));
  var dropDownButton = element(by.id("buttonColor"));
  var bookShelves = element.all(by.id("singleBookshelf"));
  /*
    some defualt variables for the user's name and password
  */
  var userNameVar = "Muhamed";
  var userEmailVar = "dummy123@hotmail.com";
  var userPasswordVar = "password";

  /*
  first step is to login
  */
  it("first step is to check the successful log in ",function(){

    browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/login'); // redirect the browser to the login page
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



  it("Checking the search book button function ",function(){

    searchBookButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/searchBooks?searchType=title');

  });

  /*
    search using the title
  */

  it("Checking the title radio button function \" success case \" ",function(){

    var titleRadioButton = radioButtons.get(2);
    titleRadioButton.click();
    searchBar.sendKeys("The Bird King");
    searchBoxButton.click();
    expect(element(by.id("bookTitle")).getText()).toBe("The Bird King");

  });

  it("Checking the author name ",function(){

    var authorName = element(by.id("bookDetails")).all(by.tagName("span"));
    expect(authorName.get(1).getText()).toBe("G. Willow Wilson");

  });

  it("Checking the rate of the book ",function(){

    rateButton.get(4).click();
    var clickStars = element(by.id("rateBook")).all(by.className("star filled"));
    browser.refresh(); // refreash the browser
    expect(clickStars.count()).toBe(5);

  });


  it("Checking the status of the button to be Want To ",function(){

    statusReadButton.get(1).click();
    dropList.get(0).click();
    expect(element(by.id("test")).getText()).toBe("Want To Read");

  });

  it("Checking the status of the button to be Currently ",function(){

    statusReadButton.get(1).click();
    dropList.get(1).click();
    expect(element(by.id("test")).getText()).toBe("Currently Reading");

  });

  it("Checking the status of the button to be Read ",function(){

    statusReadButton.get(1).click();
    dropList.get(2).click();
    expect(element(by.id("test")).getText()).toBe("Read");

  });

  it("Checking the redirection to the book page ",function(){

    element(by.id("bookTitle")).click();
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/book/1');

  });

  it("Checking the button status text ",function(){

    expect(element(by.id("test")).getText()).toBe("Read");

  });

  it("Checking the user rate",function(){

    var clickStars = element(by.id("rateBook")).all(by.className("star filled"));
    expect(clickStars.count()).toBe(5);

  });


  /*
    search using the author name
  */

  it("Checking the title radio button function \" success case \" ",function(){

    browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/searchBooks?searchType=title');
    var authorRadioButton = radioButtons.get(3);
    authorRadioButton.click();
    searchBar.sendKeys("Meagan Spooner");
    searchBoxButton.click();
    expect(element(by.id("bookTitle")).getText()).toBe("Sherwood");

  });

  it("Checking the author name ",function(){

    var authorName = element(by.id("bookDetails")).all(by.tagName("span"));
    expect(authorName.get(1).getText()).toBe("Meagan Spooner");

  });

  it("Checking the rate of the book ",function(){

    rateButton.get(4).click();
    var clickStars = element(by.id("rateBook")).all(by.className("star filled"));
    browser.refresh(); // refresh the browser
    expect(clickStars.count()).toBe(5);

  });

  it("Checking the status of the button to be Currently ",function(){

    statusReadButton.get(1).click();
    dropList.get(1).click();
    expect(element(by.id("test")).getText()).toBe("Currently Reading");

  });

  it("Checking the status of the button to be Read ",function(){

    statusReadButton.get(1).click();
    dropList.get(2).click();
    expect(element(by.id("test")).getText()).toBe("Read");

  });

  it("Checking the status of the button to be Want To ",function(){

    statusReadButton.get(1).click();
    dropList.get(0).click();
    expect(element(by.id("test")).getText()).toBe("Want To Read");

  });

  it("Checking the redirection to the book page ",function(){

    element(by.id("bookTitle")).click();
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/book/2');

  });

  it("Checking the button status text ",function(){

    expect(element(by.id("test")).getText()).toBe("Want To Read");

  });

  it("Checking the user rate",function(){

    var clickStars = element(by.id("rateBook")).all(by.className("star filled"));
    expect(clickStars.count()).toBe(5);

});




  /*
    search using the isbn
  */

  it("Checking the isbn radio button function \" success case \" ",function(){

    browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/searchBooks?searchType=title');
    var authorRadioButton = radioButtons.get(5);
    authorRadioButton.click();
    searchBar.sendKeys("9780349003344");
    searchBoxButton.click();
    expect(element(by.id("bookTitle")).getText()).toBe("Internment");

  });

  it("Checking the author name ",function(){

    var authorName = element(by.id("bookDetails")).all(by.tagName("span"));
    expect(authorName.get(1).getText()).toBe("Samira Ahmed");

  });

  it("Checking the rate of the book ",function(){

    rateButton.get(1).click();
    var clickStars = element(by.id("rateBook")).all(by.className("star filled"));
    browser.refresh(); // refresh the browser
    expect(clickStars.count()).toBe(2);

  });

  it("Checking the status of the button to be Read ",function(){

    statusReadButton.get(1).click();
    dropList.get(2).click();
    expect(element(by.id("test")).getText()).toBe("Read");

  });

  it("Checking the status of the button to be Want To ",function(){

    statusReadButton.get(1).click();
    dropList.get(0).click();
    expect(element(by.id("test")).getText()).toBe("Want To Read");

  });

  it("Checking the status of the button to be Currently ",function(){

    statusReadButton.get(1).click();
    dropList.get(1).click();
    expect(element(by.id("test")).getText()).toBe("Currently Reading");

  });

  it("Checking the redirection to the book page ",function(){

    element(by.id("bookTitle")).click();
    expect(browser.getCurrentUrl()).toEqual('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/book/4');

  });

  it("Checking the button status text ",function(){

    expect(element(by.id("test")).getText()).toBe("Currently Reading");

  });

  it("Checking the user rate",function(){

    var clickStars = element(by.id("rateBook")).all(by.className("star filled"));
    expect(clickStars.count()).toBe(2);

  });

  it("redirect to the profile page read case ",function(){

    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/");
    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/searchBooks?searchType=title");
    var titleRadioButton = radioButtons.get(2);
    titleRadioButton.click();
    searchBar.sendKeys("The Bird King");
    searchBoxButton.click();
    statusReadButton.get(1).click();
    dropList.get(2).click();
    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/");
    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/searchBooks?searchType=title");
    searchBar.sendKeys("Sherwood");
    searchBoxButton.click();
    statusReadButton.get(1).click();
    dropList.get(2).click();
    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/");
    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/searchBooks?searchType=title");
    searchBar.sendKeys("Internment");
    searchBoxButton.click();
    statusReadButton.get(1).click();
    dropList.get(2).click();
    browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/profile");
    expect(bookShelves.get(0).getText()).toBe("read (3)");


  });
  //
  // it("redirect to the profile page currently read case ",function(){
  //
  //   browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/searchBooks?searchType=title");
  //   var titleRadioButton = radioButtons.get(2);
  //   titleRadioButton.click();
  //   searchBar.sendKeys("The Bird King");
  //   searchBoxButton.click();
  //   statusReadButton.get(1).click();
  //   dropList.get(1).click();
  //   searchBar.sendKeys("Sherwood");
  //   searchBoxButton.click();
  //   statusReadButton.get(1).click();
  //   dropList.get(1).click();
  //   searchBar.sendKeys("Internment");
  //   searchBoxButton.click();
  //   statusReadButton.get(1).click();
  //   dropList.get(1).click();
  //   browser.get("http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/profile");
  //   expect(bookShelves.get(1).getText()).toBe("read (3)");
  //
  //
  // });

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
