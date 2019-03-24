describe('Followers:', function () {

	var EC = protractor.ExpectedConditions;

	/*
	first, sign in
	*/
	browser.get('http://localhost:4200/');

	var inputs = element(by.className('row')).all(by.tagName('input'));
	var signInButton = element(by.id('signInButton'));

	inputs.get(0).sendKeys('mai');
	inputs.get(1).sendKeys('mai');
	signInButton.click();



	/*
	searching function
	*/
    function search(inputText) {

		/*
		locate required elements for search
		*/
		//var searchTextBox = ;
		//var searchButton = ;

		element(by.id('searchtextfollowing')).sendKeys(inputText);
		element(by.id('searchfollowingg')).click();
	}

    beforeEach(function() {

		// for non-angular pages
        // browser.ignoreSynchronization = true;

		browser.get('http://localhost:4200/following');
	});

	it('Should find 0 results', function () {

		search('abc');
		var listItems = element.all(by.css('list-group list-group-dividered list-group-full li'));

		expect(listItems.count()).toEqual(0);
	});

	it('Should find 2 results', function () {

		search('ahmed');
		var listItems = element.all(by.css('list-group list-group-dividered list-group-full li'));

		expect(listItems.count()).toEqual(2);
	});

	it('Should find 3 results', function () {

		search('ha');
		var listItems = element.all(by.css('list-group list-group-dividered list-group-full li'));

		expect(listItems.count()).toEqual(3);
	});
});