
describe('Following page', function() {
	
	var EC = protractor.ExpectedConditions;
	
	/*
	locate required elements for search
	*/
	var searchTextBox = element(by.id('searchtextfollowing'));
	var searchButton = element(by.id('searchfollowingg'));
	var listItems = element.all(by.tagName('li'));
	var max = 0;
	var navBarFollowing = element(by.id('following'));
	var navBarFollowers = element(by.id('followers'));

	beforeAll(function () {

		browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/');
		browser.waitForAngular();
		browser.sleep(500);
			
		var inputs = element.all(by.className('row')).get(0).all(by.tagName('input'));
		var signInButton = element(by.id('signInButton'));

		inputs.get(0).sendKeys('test@yahoo.com');
		inputs.get(1).sendKeys('password');

		browser.waitForAngularEnabled(false);
		browser.ignoreSynchronization = true;

		signInButton.click();

		browser.sleep(1000);

		// browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/following');
		navBarFollowing.click();

		browser.sleep(1000);

		listItems.count().then(function(cnt){
			max = parseInt(cnt.toString());
		});
	});

	/*
	following list search tests
	*/
	describe('Following search:', function () {

		/*
		searching function
		*/
		function search(inputText) {

			searchTextBox.clear();
			searchTextBox.sendKeys(inputText);
			searchButton.click();
			// browser.waitForAngular();
			browser.sleep(5000);
		}

		it('Should find 0 results for "abc"', function () {

			search('abc');

			expect(listItems.count()).toEqual(1);
		});

		it('Should find 1 result for "le"', function () {

			search('le');

			expect(listItems.count()).toEqual(2);
		});

		it('Should find all results for "l"', function () {

			search('l');

			expect(listItems.count()).toEqual(max);
		});
	});

	/*
	follow/unfollow functionality tests
	*/
	describe('Following:', function () {

		it('Should unfollow first person in following', function () {

			element.all(by.id('stopfollow')).first().click();
			// browser.waitForAngular();
			browser.sleep(5000);

			expect(listItems.count()).toEqual(max - 1);
		});

		it('Should switch status of first person in followers', function () {

			// browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
			navBarFollowers.click();
			// browser.waitForAngular();
			browser.sleep(1000);

			var button = element.all(by.id('followbutton')).first();
			var beforeText = button.getText();
			button.click();
			// browser.waitForAngular();
			browser.sleep(5000);

			expect(button.getText()).not.toEqual(beforeText);
		});
	});
});