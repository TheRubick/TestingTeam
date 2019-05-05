
describe('Account settings:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements
	*/
	var inputs = element(by.className('row')).all(by.tagName('input'));
	var signInButton = element(by.id('signInButton'));
    var logOutButton = element(by.id('logOut'));
    var acntStngsButton = element(by.id('accountSettings'));
    var changePassword = element(by.id('changeButton'));
    var inputs = element.all(by.tagName('input'));

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
        browser.sleep(2000);
		// browser.waitForAngular();
    }
    
    beforeAll(function() {
        
        browser.wait(browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/'));

        browser.waitForAngularEnabled(false);
		browser.ignoreSynchronization = true;

        signIn();
        browser.sleep(5000);

        acntStngsButton.click();
    })
	
	// beforeEach(function() {

	// 	/*
	// 	for non-angular pages

	// 	browser.ignoreSynchronization = true;
	// 	*/

        
	// 	// browser.waitForAngular();

	// 	/*
	// 	if logged in already, log out first
	// 	*/
	// 	// logOutButton.isPresent().then(function (result) {
	// 	// 	if (result) {
	// 	// 		logOutButton.click();
	// 	// 	}
	// 	// });
	// });

	it('Should change name to "Dummy1"', function () {

        var oldName;

        inputs.get(2).getAttribute('placeholder').then(function(name){
            oldName = name.toString();
        });

        inputs.get(2).clear();
		inputs.get(2).sendKeys('Dummy1');
        browser.sleep(5000);

		expect(inputs.get(2).getAttribute('placeholder')).not.toEqual(oldName);
	});

	it('Should change country to "Germany"', function () {

        var oldName;

        inputs.get(3).getAttribute('placeholder').then(function(name){
            oldName = name.toString();
        });

        inputs.get(3).clear();
		inputs.get(3).sendKeys('Germany');
        browser.sleep(5000);

		expect(inputs.get(3).getAttribute('placeholder')).not.toEqual(oldName);
	});

	it('Should change City to "Munich"', function () {

        var oldName;

        inputs.get(4).getAttribute('placeholder').then(function(name){
            oldName = name.toString();
        });

        inputs.get(4).clear();
		inputs.get(4).sendKeys('Munich');
        browser.sleep(5000);

		expect(inputs.get(4).getAttribute('placeholder')).not.toEqual(oldName);
	});
});