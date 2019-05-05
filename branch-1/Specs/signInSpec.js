
describe('Sign in:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements
	*/
	var inputs = element(by.className('row')).all(by.tagName('input'));
	var signInButton = element(by.id('signInButton'));
	var logOutButton = element(by.id('logOut'));
	var errorText = element(by.className('row')).all(by.tagName('h6')).first();

	/*
	locate updates header in home page
	*/
	var updatesHeader = element(by.id('updates'));

	/*
	input values to be used
	*/
	var varEmail = "test@yahoo.com";
	var varPassword = "password";
	var incorrectEmail = "abc";
	var incorrectPassword = "321";

	/*
	a function to do the signing in process
	default values are for successful sign in
	*/
	function signIn(inputEmail = varEmail, inputPassword = varPassword) {

		inputs.get(0).sendKeys(inputEmail);
		inputs.get(1).sendKeys(inputPassword);

		signInButton.click();
	}
	
	beforeEach(function() {

		/*
		for non-angular pages

		browser.ignoreSynchronization = true;
		*/

		browser.wait(browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/'));
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

	it('Should show incorrect credentials error', function () {

		signIn(varEmail, incorrectPassword);

		expect(errorText.getText()).toEqual('incorrect username or password');
	});

	it('Should show incorrect credentials error', function () {

		signIn(incorrectEmail, varPassword);

		expect(errorText.getText()).toEqual('incorrect username or password');
	});

	it('Should show missing credentials error', function () {

		signIn(varEmail, '');

		expect(errorText.getText()).toEqual('You must enter username and password');
	});

	it('Should show missing credentials error', function () {

		signIn('', varPassword);

		expect(errorText.getText()).toEqual('You must enter username and password');
	});

	it('Should sign in successfully', function () {

		signIn(varEmail, varPassword);

		expect(browser.wait(EC.presenceOf(logOutButton))).toBeTruthy();
	});

	it('Should log out successfully', function () {

		signIn();
		browser.waitForAngular();
		logOutButton.click();

		expect(browser.wait(EC.presenceOf(signInButton))).toBeTruthy();
	});
});