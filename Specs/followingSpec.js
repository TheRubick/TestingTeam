﻿var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
	var args = arguments;

	/*
	queue 200ms wait
	*/
	origFn.call(browser.driver.controlFlow(), function () {
		return protractor.promise.delayed(300);
	});

	return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Following:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements for search
	*/
	var searchTextBox = element(by.id('searchtextfollowing'));
	var searchButton = element(by.id('searchfollowingg'));
	var listItems = element.all(by.tagName('li'));

	var max = listItems.count();

	/*
	first, sign in
	*/
	it('Preparation', function () {

		browser.get('http://localhost:4200/');

		var inputs = element(by.className('row')).all(by.tagName('input'));
		var signInButton = element(by.id('signInButton'));

		inputs.get(0).sendKeys('zachariah72@example.com');
		inputs.get(1).sendKeys('password');
		signInButton.click();
		browser.get('http://localhost:4200/following');
		browser.refresh(10 * 1000);
		//expect(browser.wait(EC.presenceOf(element(by.id('searchtextfollowing'))), 10 * 1000)).toBeTruthy();
	});

	it('Should unfollow first person', function () {

		listItems.get(0).all(by.id('stopfollow')).click();

		expect(listItems.count()).toEqual(max - 1);
	});

	it('Should switch status of first person in followers', function () {

		browser.get('http://localhost:4200/followers');

		var button = listItems.get(0).all(by.partialButtonText('follow'));
		var beforeText = button.getText();
		button.click();
		browser.sleep(10 * 1000);

		expect(button.getText()).not.toEqual(beforeText);
	}
});