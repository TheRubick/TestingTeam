
describe('Sign in:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements
	*/
	var inputs = element(by.className('row')).all(by.tagName('input'));
	var signInButton = element(by.id('signInButton'));
	var logOutButton = element(by.id('logOut'));
	var errorText = element(by.className('row')).all(by.tagName('p')).first();
	var navBar = element(by.tagName('navbar'));

	/*
	locate updates header in home page
	*/
	var updatesHeader = element(by.id('updates'));

	/*
	input values to be used
	*/
	var varEmail = "test@yahoo.com";
	var varPassword = "password";
	var incorrectEmail = "abcxyz@abcxyz";
	var incorrectPassword = "123456";
	var invalidEmail = "abc";

	/*
	a function to do the signing in process
	default values are for successful sign in
	*/
	function signIn(inputEmail = varEmail, inputPassword = varPassword) {

		inputs.get(0).sendKeys(inputEmail);
		inputs.get(1).sendKeys(inputPassword);

		signInButton.click();
		browser.waitForAngular();
	}
	
	beforeEach(function() {

		/*
		for non-angular pages

		browser.ignoreSynchronization = true;
		*/

		browser.wait(browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/'));
		browser.waitForAngular();

		/*
		if logged in already, log out first
		*/
		// logOutButton.isPresent().then(function (result) {
		// 	if (result) {
		// 		logOutButton.click();
		// 	}
		// });
	});

	it('Should show incorrect credentials error', function () {

		signIn(varEmail, incorrectPassword);

		expect(errorText.getText()).toEqual('The email or password is invalid.');
	});

	it('Should show incorrect credentials error', function () {

		signIn(incorrectEmail, varPassword);

		expect(errorText.getText()).toEqual('The email or password is invalid.');
	});

	it('Should show missing credentials error', function () {

		signIn(varEmail, '');

		expect(errorText.getText()).toEqual('You must enter username and password');
	});

	it('Should show missing credentials error', function () {

		signIn('', varPassword);

		expect(errorText.getText()).toEqual('You must enter username and password');
	});

	it('Should show invalid email error', function() {
		signIn(invalidEmail, varPassword);

		expect(errorText.getText()).toEqual('You must enter username and password')
	})

	it('Should sign in successfully', function () {

		browser.waitForAngularEnabled(false);
		browser.ignoreSynchronization = true;

		signIn(varEmail, varPassword);

		expect(browser.wait(EC.presenceOf(logOutButton))).toBeTruthy();
	});

	it('Should log out successfully', function () {


		// signIn();
		// browser.waitForAngularEnabled(true);
		logOutButton.click();
		browser.waitForAngular();

		expect(browser.wait(EC.stalenessOf(logOutButton))).toBeTruthy();
	});
});