
describe('Followers page', function() {
	
		var EC = protractor.ExpectedConditions;
		
		/*
		locate required elements for search
		*/
		var searchTextBox = element(by.id('searchtextfollowing'));
		var searchButton = element(by.id('searchfollowingg'));
		var listItems = element.all(by.tagName('li'));
		var max;
	
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
				browser.waitForAngular();
				browser.sleep(500);
		}
	
		beforeAll(function () {
		
				browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/');
				browser.waitForAngular();
				browser.sleep(500);
					
				var inputs = element.all(by.className('row')).get(0).all(by.tagName('input'));
				var signInButton = element(by.id('signInButton'));
			
				signIn();
				browser.waitForAngular();
				browser.sleep(500);
			
				browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
				browser.waitForAngular();
				browser.sleep(500);
			
				listItems.count().then(function(cnt){
						max = cnt;
				});
		});

			it('Waleed should unfollow:', function () {

					element(by.id('logOut')).click();
					browser.waitForAngular();
				
					signIn('waleed@yahoo.com','password');
					browser.waitForAngular();
		
					browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/following');
					browser.waitForAngular();
				
					element.all(by.id('stopfollow')).first().click();
					browser.waitForAngular();
				
					element(by.id('logOut')).click();
					browser.waitForAngular();
				
					signIn();
					browser.waitForAngular();
				
					browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
					browser.waitForAngular();
			
					expect(listItems.count()).toEqual(max-1);
			});
			it('Waleed should follow again:', function () {
				
				element(by.id('logOut')).click();
					browser.waitForAngular();
				
					signIn('waleed@yahoo.com','password');
					browser.waitForAngular();
		
					browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
					browser.waitForAngular();
				
					element.all(by.id('followbutton')).first().click();
					browser.waitForAngular();
				
					element(by.id('logOut')).click();
					browser.waitForAngular();
				
					signIn();
					browser.waitForAngular();
				
					browser.get('http://ec2-52-90-5-77.compute-1.amazonaws.com/app/followers');
					browser.waitForAngular();
			
					expect(listItems.count()).toEqual(max);
			});
});