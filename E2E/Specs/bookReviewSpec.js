
describe('Book:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	locate required elements
	*/
	var inputs = element(by.className('row')).all(by.tagName('input'));
	var signInButton = element(by.id('signInButton'));
	var logOutButton = element(by.id('logOut'));
    
	/*
	input values to be used
	*/
	var varEmail = "test_4@example.com";
    var varPassword = "12345678";
    
    /*
    book page elements
    */
    // var countBefore;
    var textBefore;
    var classBefore;
    var myActivity = element(by.id('activity'));
    var stars = element.all(by.className('star'));
    var reviewText = element(by.tagName('textarea'));
    var saveButton = element(by.id('save'));
    var deleteButton = element(by.id('delete'));
    var editReview = element(by.id('reviewbtn'));
    var reviews = element.all(by.className('media'));
    var comments = element.all(by.className('loop'));
    var commentsButtons = element.all(by.partialButtonText('comments'));
    var commentAreas = element(by.className('detailBox')).all(by.tagName('input'));
    var submitButton = element.all(by.id('submitbtn'));
    var removeComment = element.all(by.partialButtonText('x'));
    var likeButton = element.all(by.partialButtonText('like'));

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
        // browser.waitForAngular();

            browser.waitForAngularEnabled(false);
            browser.ignoreSynchronization = true;
        
        signIn();
        browser.sleep(5000);
        // browser.waitForAngular();
        
        browser.wait(browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/#/book/1'));
        browser.sleep(1000);
        
        // browser.waitForAngular();
    })

	it('Should make a review', function () {

        stars.get(2).click();
        browser.sleep(5000);
        reviewText.sendKeys('Decent.');
        browser.sleep(1000);
        saveButton.click();
        browser.sleep(1000);

		expect(browser.wait(EC.presenceOf(myActivity))).toBeTruthy();
    });

	it('Should delete the review', function () {
        
        stars.getAttribute('class').then(function(cls){
            classBefore = cls.toString();
        });

        editReview.click();
        browser.sleep(1000);
        deleteButton.click();
        browser.sleep(5000);

		expect(stars.getAttribute('class')).not.toEqual(classBefore);
    });

	it('Should add a comment', function () {

        commentsButtons.first().click();
        browser.sleep(1000);
        commentAreas.sendKeys('I agree!');
        browser.sleep(1000);
        submitButton.first().click();
        browser.sleep(5000);

		expect(comments.count()).toEqual(1);
    });

	it('Should remove the comment', function () {

        removeComment.first().click();
        browser.sleep(5000);

		expect(comments.count()).toEqual(0);
    });

	it('Should switch between like/unlike on the first comment', function () {
        
        likeButton.first().getText().then(function(txt){
            textBefore = txt.toString();
        });

        likeButton.first().click();
        browser.sleep(1000);

		expect(likeButton.first().getText()).not.toEqual(textBefore);
    });
});