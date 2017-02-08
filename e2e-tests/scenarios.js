// e2e-test for Task Manager application
describe('Task Manager Application',function(){
	describe('homePage',function(){
// testing app on home-page view
        beforeEach(function(){
            browser.get('/#!/home');
        });
// should show how many tasks are open
        it('should have desciption with open tasks',
            function(){
                var descr=element(by.id('opTasks'));
// give browser time to load element with description
                browser.wait(function(){
                    return browser.isElementPresent(descr);
                },10000);
// test element
                expect(descr.getText()).not.toEqual('There are currently open  tasks');
        });
// test application navigation
        it('should redirect to list page and set nav element as active',
            function(){
                var listLink=element.all(by.css('li a')).last();
                var listButton=element(by.css('li.active'));
        	    listLink.click();
                expect(browser.getLocationAbsUrl()).toBe('/list');
// wait until button is present
                browser.wait(function(){
                    return browser.isElementPresent(listButton);
                },10000);
// test it
                expect(browser.isElementPresent(listButton)).toBeTruthy();
                expect(listButton.getAttribute('class')).toEqual('ng-scope active');
        });
    });
    describe('listOfTasks',function(){
// testing app on list-of-tasks view
        var crtBtn=element(by.css('.btn-success'));
        var input=element(by.id('input'));
        var select=element(by.css('.dropdown-toggle'));
        var sevVal=element.all(by.repeater('sev in lotCtrl.severity'));
        var tasks=element.all(by.repeater('task in lotCtrl.tasks'));
        beforeEach(function(){
            browser.get('/#!/list');
        });
// submit button for task creation should be disabled while inputs are empty
        it('should have disabled button \'Create Task\' while '+
            'one of input is empty',
            function(){
                browser.wait(function(){
                    return browser.isElementPresent(crtBtn);
                },10000);
// button should be disabled by default
                expect(crtBtn.getAttribute('disabled')).toBeTruthy();
                input.sendKeys('Validation test');
// should stay disabled because severity is not chosen
                expect(crtBtn.getAttribute('disabled')).toBeTruthy();
                input.clear();
// clear input field
                select.click();
                browser.wait(function(){
                    return browser.isElementPresent(by
                        .repeater('sev in lotCtrl.severity'));
                });
                element.all(by.repeater('sev in lotCtrl.severity'))
// select severity value
                  .then(function(severity){
                    var val=severity[4].element(by.className('sev'));
                    val.click();
// submit button should stay disabled because input field is now empty
                    expect(crtBtn.getAttribute('disabled')).toBeTruthy();
                });
        });
// creating new task
        it('should create a new task in the list',function(){
            element.all(by
             .repeater('task in lotCtrl.tasks'))
               .count().then(function(numberOfTasks){
                 input.sendKeys('Validation test');
                 expect(crtBtn.getAttribute('disabled')).toBeTruthy();
                 select.click();
                 browser.wait(function(){
                    return browser.isElementPresent(by
                     .repeater('sev in lotCtrl.severity'));
                 },10000);
                 element.all(by.repeater('sev in lotCtrl.severity'))
                  .then(function(severity){
                     var val=severity[4].element(by.className('sev'));
                     val.click();
                     expect(crtBtn.getAttribute('disabled')).toBeFalsy();
                     crtBtn.click();
// submit creation
                     browser.wait(function(){
                         return browser.isElementPresent(by
                          .repeater('task in lotCtrl.tasks'));
                     },10000);
                     element.all(by.repeater('task in lotCtrl.tasks'))
// reload tasks list
                      .then(function(cTasks){
                            var task=cTasks[numberOfTasks]
                                .element(by.className('descr'));
// new task should be equal to input values
                            expect(task.getText()).toEqual('Validation test');
// submit task button now should be disabled
                            expect(crtBtn.getAttribute('disabled')).toBeTruthy();
                     });
                 });
           });
        });
// edit created task and then delete
        it('should be able to edit new task and then delete',function(){
        	element.all(by
             .repeater('task in lotCtrl.tasks'))
              .count().then(function(numberOfTasks){
                browser.wait(function(){
                  return browser.isElementPresent(by
                   .repeater('task in lotCtrl.tasks'));
                },10000);
                element.all(by.repeater('task in lotCtrl.tasks'))
                  .then(function(cTasks){
                      var edit=cTasks[numberOfTasks-1]
                          .element(by.className('btn-info'));
                      edit.click();
// edit task
// wait until elements for edit mode will appear
                      browser.wait(function(){
                          return browser.isElementPresent(by
                            .className('btn-primary'))&&browser.isElementPresent(by
                              .className('input-sm'));
                      },10000);
                      var save=cTasks[numberOfTasks-1].element(by.className('btn-primary'));
                      var editInp=cTasks[numberOfTasks-1].element(by.className('input-sm'));
                      expect(save.getAttribute('disabled')).toBeFalsy();
// enter new task name
                      editInp.clear();
// save button should be disabled until input field is empty
                      expect(save.getAttribute('disabled')).toBeTruthy();
                      editInp.sendKeys('New task');
// save button now should'nt be disabled
                      expect(save.getAttribute('disabled')).toBeFalsy();
                      save.click();
// save new task
                });
// reload task list
                element.all(by.repeater('task in lotCtrl.tasks'))
                  .then(function(cTasks){
// wait until normal mode elements will appear
                      browser.wait(function(){
                          return browser.isElementPresent(by
                            .tagName('span'))&&browser.isElementPresent(by
                              .className('btn-danger'));
                      },10000);
                      var task=cTasks[numberOfTasks-1].element(by.tagName('span'));
                      var del=cTasks[numberOfTasks-1].element(by.className('btn-danger'));
// name of task should be equal to value of input in editMode
                      expect(task.getText()).toEqual('New task');
// delete task
                      del.click();
                });
// reload task list
                element.all(by.repeater('task in lotCtrl.tasks'))
                  .count().then(function(count){
// number of tasks should be equal to number before e2e test
                      expect(count).toBe(numberOfTasks-1);
                });
           });
        });
    });
});
