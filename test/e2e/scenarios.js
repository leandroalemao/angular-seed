'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */
describe('my app', function() {

  beforeEach(function() {
      browser.get('app/index.html');
    });

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });

  describe('Phone list view', function() {

      beforeEach(function() {
        browser.get('app/index.html');
      });


      it('should filter the phone list as user types into the search box', function() {

        var phoneList = element.all(by.repeater('phone in phones'));
        var query = element(by.model('query'));

        expect(phoneList.count()).toBe(3);

        query.sendKeys('nexus');
        expect(phoneList.count()).toBe(1);

        query.clear();
        query.sendKeys('motorola');
        expect(phoneList.count()).toBe(2);
      });

      it('should be possible to control phone order via the drop down select box', function() {

          var phoneNameColumn = element.all(by.repeater('phone in phones').column('{{phone.name}}'));
          var query = element(by.model('query'));

          function getNames() {
            return phoneNameColumn.map(function(elm) {
              return elm.getText();
            });
          }

          query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

          expect(getNames()).toEqual([
            "Motorola XOOM\u2122 with Wi-Fi",
            "MOTOROLA XOOM\u2122"
          ]);

          element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

          expect(getNames()).toEqual([
            "MOTOROLA XOOM\u2122",
            "Motorola XOOM\u2122 with Wi-Fi"
          ]);
      });

    });

  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
