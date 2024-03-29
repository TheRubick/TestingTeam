﻿
describe('Sign up:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements
	*/
	var inputs = element.all(by.className('row')).get(2).all(by.tagName('input'));
	var signUpButton = element(by.id('signUpButton'));
	var logOutButton = element(by.id('logOut'));
	var errorText = element.all(by.className('row')).get(2).all(by.tagName('h6')).first();

	/*
	correct sign up data
	*/
	var varName = 'Test';
	var varEmail = 'test4@example.com';
	var varPassword = '12345678';
	var varConfirmPassword = '12345678';
	var varGender = 'male';
	var varDate = ['01','01','1991'];
	var varCountry = 'Egypt';
	var varCity = 'Cairo';

	/*
	incorrect sign up data
	*/
	var empty = '';
	var incorrectName = 'Ab';	// should be at least 3 characters
	var incorrectEmail = 'test';	// should be in the form '<string>@<string>'
	var incorrectPassword = '1234';	// should be at least 5 characters
	var incorrectConfirmPassword = '1234';
	var incorrectDate = ['01','01','2019'];	// should be more than 3 years old

	/*
	a function to do the signing in process
	*/
	function signIn(inputEmail = varEmail, inputPassword = varPassword) {

		var signInInputs = element.all(by.className('row')).get(0).all(by.tagName('input'));
		var signInButton = element(by.id('signInButton'));

		signInInputs.get(0).sendKeys(inputEmail);
		signInInputs.get(1).sendKeys(inputPassword);

		signInButton.click();
	}

	/*
	a function to do the signing up process
	*/
	function signUp(inputName, inputEmail, inputPassword, inputConfirmPassword,
		inputGender, inputDate, inputCountry, inputCity) {

		inputs.get(0).sendKeys(inputName);
		inputs.get(1).sendKeys(inputEmail);
		inputs.get(2).sendKeys(inputPassword);
		inputs.get(3).sendKeys(inputConfirmPassword);
		if (inputGender == 'male')
		{
			inputs.get(4).click();
		}
		else if (inputGender == 'female')
		{
			inputs.get(5).click();
		}
		for (var i = 0; i<3; ++i){
			inputs.get(6).sendKeys(inputDate[i]);
			if (i==1) inputs.get(6).sendKeys(protractor.Key.ARROW_RIGHT);
		}
		// browser.sleep(5000);
		inputs.get(7).sendKeys(inputCountry);
		inputs.get(8).sendKeys(inputCity);

		signUpButton.click();
		browser.waitForAngular();
	}
	
	beforeEach(function() {

		/*
		for non-angular pages

		browser.ignoreSynchronization = true;
		*/

		browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/');
		browser.waitForAngular();
		browser.sleep(500);

		/*
		if logged in already, log out first
		*/
		logOutButton.isPresent().then(function (result) {
			if (result) {
				logOutButton.click();
			}
		});
	});

	/*
	missing data tests
	*/
	it('Should show missing email error', function () {

		signUp(varName, empty, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The email field is required.');
	});

	it('Should show missing password error', function () {

		signUp(varName, varEmail, empty, varConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The password field is required.');
	});

	it('Should show unmatched passwords error', function () {

		signUp(varName, varEmail, varPassword, empty, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The password confirmation does not match.');
	});

	it('Should show missing name error', function () {

		signUp(empty, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The name field is required.');
	});

	it('Should show missing gender error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, empty, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The gender field is required.');
	});

	it('Should show missing birthdate error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, [empty,empty,empty], varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The birthday field is required.');
	});

	it('Should show missing country error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, empty, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The country field is required.');
	});

	it('Should show missing city error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, empty);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The city field is required.');
	});

	it('Should sign up successfully', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);

		expect(browser.wait(EC.presenceOf(logOutButton))).toBeTruthy();
	});

	/*
	unallowed data tests
	*/
	it('Should show missing email error', function () {

		signUp(varName, incorrectEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The email field is required.');
	});

	it('Should show missing password error', function () {

		signUp(varName, varEmail, incorrectPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The password field is required.');
	});

	it('Should show unmatched passwords error', function () {

		signUp(varName, varEmail, varPassword, incorrectConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The password confirmation does not match.');
	});

	it('Should show missing name error', function () {

		signUp(incorrectName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The name field is required.');
	});

	it('Should show missing birthdate error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, incorrectDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText));

		expect(errorText.getText()).toEqual('The birthday field is required.');
	});

	it('Should sign up successfully', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);

		expect(browser.wait(EC.presenceOf(logOutButton))).toBeTruthy();
	});


	it('Should sign in successfully using new credentials', function () {

		signIn('test@example.com', '12345678');

		expect(browser.wait(EC.presenceOf(logOutButton))).toBeTruthy();
	});

	it('Should show used email error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);
		browser.wait(EC.presenceOf(errorText), 10000);

		expect(errorText.getText()).toEqual('The email has already been taken.');
	});
});