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
	*/
	function signIn(inputUsername = 'mai', inputPassword = 'mai') {

		inputs.get(0).sendKeys(inputUsername);
		inputs.get(1).sendKeys(inputPassword);
		signInButton.click();
	}
	
	beforeEach(function() {

		/*
		for non-angular pages

		browser.ignoreSynchronization = true;
		*/

		browser.get('http://localhost:4200/');
	});

	it('Should show incorrect credentials error', function () {

		signIn('mai', '123');

		expect(errorText.getText()).toEqual('incorrect username or password');
	});

	it('Should show missing credentials error', function () {

		signIn('mai', '');

		expect(errorText.getText()).toEqual('You must enter username and password');
	});

	it('Should sign in successfuly', function () {

		signIn('mai', 'mai');

		expect(updatesHeader.getText()).toEqual('Updates');
	});

	it('Should log out successfully', function () {

		logOutButton.click();

		expect(browser.wait(EC.presenceOf(signInButton), 5 * 1000)).toBeTruthy();
	});
});