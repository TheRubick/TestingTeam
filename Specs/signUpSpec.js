describe('Sign up:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements
	*/
	var inputs = element(by.css('ng-pristine ng-invalid ng-touched')).all(by.tagName('input'));
	var signUnButton = element(by.id('signUpButton'));
	var logOutButton = element(by.id('logOut'));
	var errorText = element(by.css('ng-pristine ng-invalid ng-touched')).all(by.tagName('h6')).first();

	/*
	sign up credentials
	*/
	var varName = 'Test';
	var varEmail = 'test@example.com';
	var varPassword = '12345678';
	var varConfirmPassword = '12345678';
	var varGender = 'male';
	var varDate = '01-Jan-1991';
	var varCountry = 'Egypt';
	var varCity = 'Cairo';
	var empty = '';

	/*
	locate updates header in home page
	*/
	var updatesHeader = element(by.id('updates'));

	/*
	a function to do the signing in process
	*/
	function signIn(inputEmail = 'zachariah72@example.net', inputPassword = 'password') {

		inputs.get(0).sendKeys(inputEmail);
		inputs.get(1).sendKeys(inputPassword);

		signInButton.click();
	}

	/*
	a function to do the signing up process
	*/
	function signUp(inputName, inputEmail, inputPassword, inputConfirmPassword, inputGender, inputDate, inputCountry, inputCity) {

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
		inputs.get(6).sendKeys(inputDate);
		inputs.get(7).sendKeys(inputCountry);
		inputs.get(8).sendKeys(inputCity);

		signUpButton.click();
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

	it('Should show missing email error', function () {

		signUp(varName, empty, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);

		expect(errorText.getText()).toEqual('The email field is required.');
	});

	it('Should show missing password error', function () {

		signUp(varName, varEmail, empty, varConfirmPassword, varGender, varDate, varCountry, varCity);

		expect(errorText.getText()).toEqual('The password field is required.');
	});

	it('Should show unmatched passwords error', function () {

		signUp(varName, varEmail, varPassword, empty, varGender, varDate, varCountry, varCity);

		expect(errorText.getText()).toEqual('The password confirmation does not match.');
	});

	it('Should show missing name error', function () {

		signUp(empty, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);

		expect(errorText.getText()).toEqual('The name field is required.');
	});

	it('Should show missing gender error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, empty, varDate, varCountry, varCity);

		expect(errorText.getText()).toEqual('The gender field is required.');
	});

	it('Should show missing birthdate error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, empty, varCountry, varCity);

		expect(errorText.getText()).toEqual('The birthday field is required.');
	});

	it('Should show missing country error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, empty, varCity);

		expect(errorText.getText()).toEqual('The country field is required.');
	});

	it('Should show missing city error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, empty);

		expect(errorText.getText()).toEqual('The city field is required.');
	});

	it('Should sign up successfully', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);

		expect(browser.wait(EC.presenceOf(logOutButton), 5 * 1000)).toBeTruthy();
	});

	it('Should sign in successfully using new credentials', function () {

		signIn('test@example.com', '12345678');

		expect(browser.wait(EC.presenceOf(logOutButton), 5 * 1000)).toBeTruthy();
	});

	it('Should show used email error', function () {

		signUp(varName, varEmail, varPassword, varConfirmPassword, varGender, varDate, varCountry, varCity);

		expect(errorText.getText()).toEqual('The email has already been taken.');
	});
});