
  var origFn = browser.driver.controlFlow().execute;

  browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};


describe('Followers:', function () {

	var EC = protractor.ExpectedConditions;


	it('Sign in', function () {

		/*
		first, sign in
		*/
		browser.get('http://localhost:4200/');

		var inputs = element(by.className('row')).all(by.tagName('input'));
		var signInButton = element(by.id('signInButton'));

		inputs.get(0).sendKeys('mai');
		inputs.get(1).sendKeys('mai');
		signInButton.click();

	});



	/*
	searching function

    function search(inputText) {

		/*
		locate required elements for search
		*/
		//var searchTextBox = ;
		//var searchButton = ;

		/*
		element(by.id('searchtextfollowing')).sendKeys(inputText);
		element(by.id('searchfollowingg')).click();


	}
*/


    beforeEach(function() {

		// for non-angular pages
        // browser.ignoreSynchronization = true;

				browser.get('http://localhost:4200/following');
	});

	it('Should find 0 results', function () {

	element(by.id('searchtextfollowing')).sendKeys('abc');
		element(by.id('searchfollowingg')).click();

		var listItems = element.all(by.css('list-group list-group-dividered list-group-full li'));

		expect(listItems.count()).toEqual(0);
	});


	it('Should find 2 results', function () {

		element(by.id('searchtextfollowing')).sendKeys('ahmed');
		element(by.id('searchfollowingg')).click();
		var listItems = element.all(by.tagName('li'));
		expect(listItems.count()).toEqual(2);
	});

	it('Should find 3 results', function () {

		element(by.id('searchtextfollowing')).sendKeys('ha');
		element(by.id('searchfollowingg')).click();
		var listItems = element.all(by.tagName('li'));
		expect(listItems.count()).toEqual(3);
	});

});
