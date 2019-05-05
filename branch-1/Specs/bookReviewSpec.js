
describe('Book:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements
	*/
	var inputs = element(by.className('row')).all(by.tagName('input'));
	var signInButton = element(by.id('signInButton'));
	var logOutButton = element(by.id('logOut'));
    var errorText = element(by.className('row')).all(by.tagName('h6')).first();
    
	/*
	input values to be used
	*/
	var varEmail = "test@example.com";
    var varPassword = "12345678";
    
    /*
    book page elements
    */
    var stars = element.all(by.className('star'));
    var bookStatus = element(by.className('modal-body')).all(by.tagName('input'));
    var reviewText = element(by.tagName('textarea'));
    var postButton = element(by.id('post'));
    var reviews = element.all(by.className('media'));

	/*
	a function to do the signing in process
	default values are for successful sign in
	*/
	function signIn(inputEmail = varEmail, inputPassword = varPassword) {

		inputs.get(0).sendKeys(inputEmail);
		inputs.get(1).sendKeys(inputPassword);

		signInButton.click();
    }
    
    beforeAll(function(){

		browser.wait(browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/'));
        browser.waitForAngular();
        
        signIn();
        browser.waitForAngular();
        
		browser.wait(browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/book/1'));
        browser.waitForAngular();
    })

	it('Should make a review', function () {

        var countBefore;
        reviews.count().then(function(cnt){
            countBefore = cnt;
        });

        stars.get(2).click();
        bookStatus.get(2).click();
        reviewText.sendKeys('Decent.');
        postButton.click();

		browser.wait(browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/book/1'));
        browser.waitForAngular();

		expect(reviews.count()).toEqual(7);
	});
});