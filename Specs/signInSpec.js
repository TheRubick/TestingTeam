describe('Sign in:', function () {

	var EC = protractor.ExpectedConditions;

	// locate required elements
	var inputs = element(by.className('row')).all(by.tagName('input'));
	var signInButton = element(by.partialButtonText('Sign in'));

	// locate updates header in home page
	var updatesHeader = element(by.id('updates'));

    function signIn(inputUsername, inputPassword) {

		inputs.get(0).sendKeys(inputUsername);
		inputs.get(1).sendKeys(inputPassword);
		signInButton.click();
    }

    beforeEach(function() {

		// for non-angular pages
        // browser.ignoreSynchronization = true;

		browser.get('http://localhost:4200/');
	});

	afterEach(function () {

		var logOutButton = element(by.partialButtonText('Log out'));

		logOutButton.click();
	});

	it('Should sign in successfuly', function (done) {

        signIn('test', 'test');

		expect(updatesHeader.getText()).toEqual('Updates');
    });

	it('Should fail to sign in', function (done) {

		signIn('test', '1234');

		expect(browser.wait(EC.stalenessOf(updatesHeader), 5*1000)).toBeTruthy();
    });

});