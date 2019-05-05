
describe('Followers page', function() {
	
		var EC = protractor.ExpectedConditions;
		
		/*
		locate required elements for search
		*/
		var searchTextBox = element(by.id('searchtextfollowing'));
		var searchButton = element(by.id('searchfollowingg'));
		var listItems = element.all(by.tagName('li'));
		var max;
		var navBarFollowing = element(by.id('following'));
		var navBarFollowers = element(by.id('followers'));
	
		/*
		sign in elements
		*/
		signInInputs = element(by.className('row')).all(by.tagName('input'));
		signInButton = element(by.id('signInButton'));

		/*
		input values to be used
		*/
		var varEmail = "ta7a@yahoo.com";
		var varPassword = "password";	

		/*
		a function to do the signing in process
		default values are for successful sign in
		*/
		function signIn(inputEmail = varEmail, inputPassword = varPassword) {
		
				signInInputs.get(0).sendKeys(inputEmail);
				signInInputs.get(1).sendKeys(inputPassword);
			
				signInButton.click();
				// browser.waitForAngular();
				browser.sleep(5000);
		}
	
		beforeAll(function () {
		
				browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/');
				// browser.waitForAngular();
				browser.sleep(5000);
					
				var inputs = element.all(by.className('row')).get(0).all(by.tagName('input'));
				var signInButton = element(by.id('signInButton'));

				browser.waitForAngularEnabled(false);
				browser.ignoreSynchronization = true;
			
				signIn();
				// browser.waitForAngular();
				browser.sleep(5000);
			
				// browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
				navBarFollowers.click();
				// browser.waitForAngular();
				browser.sleep(5000);
			
				listItems.count().then(function(cnt){
						max = parseInt(cnt.toString());
				});
		});

			it('Waleed should unfollow:', function () {

					element(by.id('logOut')).click();
					browser.waitForAngular();
					browser.sleep(5000);
				
					signIn('waleed@yahoo.com','password');
					browser.sleep(5000);
					// browser.waitForAngular();
		
					// browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/following');
					navBarFollowing.click();
					browser.sleep(5000);
					// browser.waitForAngular();
				
					element.all(by.id('stopfollow')).first().click();
					browser.sleep(5000);
					// browser.waitForAngular();
				
					element(by.id('logOut')).click();
					browser.sleep(5000);
					// browser.waitForAngular();
				
					signIn();
					browser.sleep(5000);
					// browser.waitForAngular();
				
					// browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
					navBarFollowers.click();
					browser.sleep(5000);
					// browser.waitForAngular();
			
					expect(listItems.count()).toEqual(max - 1);
			});

			it('Waleed should follow again:', function () {
				
				element(by.id('logOut')).click();
				browser.sleep(5000);
				// browser.waitForAngular();
			
				signIn('waleed@yahoo.com','password');
				browser.sleep(5000);
				// browser.waitForAngular();
	
				// browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
				navBarFollowers.click();
				browser.sleep(5000);
				// browser.waitForAngular();
			
				element.all(by.id('followbutton')).first().click();
				browser.sleep(5000);
				// browser.waitForAngular();
			
				element(by.id('logOut')).click();
				browser.sleep(5000);
				// browser.waitForAngular();
			
				signIn();
				browser.sleep(5000);
				// browser.waitForAngular();
			
				// browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
				navBarFollowers.click();
				browser.sleep(5000);
				// browser.waitForAngular();
		
				expect(listItems.count()).toEqual(max);
			});
});