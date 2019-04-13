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
	a function to do the signing in process
	default values are for successful sign in
	*/
	function signIn(inputEmail = 'zachariah72@example.net', inputPassword = 'password') {

		inputs.get(0).sendKeys(inputEmail);
		inputs.get(1).sendKeys(inputPassword);

		signInButton.click();
	}
	
	beforeEach(function() {

		/*
		for non-angular pages

		browser.ignoreSynchronization = true;
		*/

		browser.get('http://localhost:4200/');

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

		signIn('zachariah72@example.net', '123');

		expect(errorText.getText()).toEqual('incorrect username or password');
	});

	it('Should show incorrect credentials error', function () {

		signIn('zachariah72', 'password');

		expect(errorText.getText()).toEqual('incorrect username or password');
	});

	it('Should show missing credentials error', function () {

		signIn('zachariah72@example.net', '');

		expect(errorText.getText()).toEqual('You must enter username and password');
	});

	it('Should show missing credentials error', function () {

		signIn('', 'password');

		expect(errorText.getText()).toEqual('You must enter username and password');
	});

	it('Should sign in successfully', function () {

		signIn('zachariah72@example.net', 'password');

		expect(browser.wait(EC.presenceOf(logOutButton), 5 * 1000)).toBeTruthy();
	});

	it('Should log out successfully', function () {

		signIn();
		logOutButton.click();

		expect(browser.wait(EC.presenceOf(signInButton), 5 * 1000)).toBeTruthy();
	});
});