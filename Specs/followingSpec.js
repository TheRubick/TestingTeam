﻿var origFn = browser.driver.controlFlow().execute;

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

describe('Following:', function () {

	var EC = protractor.ExpectedConditions;
	
	it('Sign in', function () {

		browser.get('http://localhost:4200/');

		var inputs = element(by.className('row')).all(by.tagName('input'));
		var signInButton = element(by.id('signInButton'));

		inputs.get(0).sendKeys('mai');
		inputs.get(1).sendKeys('mai');
		signInButton.click();
		browser.get('http://localhost:4200/following', 1000);
	});

	/*
	locate required elements for search
	*/
	var searchTextBox = element(by.id('searchtextfollowing'));
	var searchButton = element(by.id('searchfollowingg'));
	var listItems = element.all(by.tagName('li'));

	beforeEach(function () {

		searchTextBox.clear();
	});

	/*
	searching function
	*/
    function search(inputText) {

		searchTextBox.sendKeys(inputText);
		searchButton.click();
	}

	it('Should find 0 results for "abc"', function () {

		search('abc');

		expect(listItems.count()).toEqual(0);
	});

	it('Should find 2 results for "ahmed"', function () {

		search('ahmed');

		expect(listItems.count()).toEqual(2);
	});

	it('Should find 3 results for "ha"', function () {

		search('ha');

		expect(listItems.count()).toEqual(3);
	});

	it('Should find 6 results for " "', function () {

		search(' ');

		expect(listItems.count()).toEqual(6);
	});
});