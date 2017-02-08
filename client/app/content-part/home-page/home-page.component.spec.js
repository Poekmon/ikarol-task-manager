// unit test for homePage component
describe('homePage',function(){
    beforeEach(module('contentPart'));
    describe('HomePageController',function(){
        var $httpBackend,ctrl;
// example data
        var taskData={
            name: 'Test this component',
            completed: true
        };
        beforeEach(inject(function($componentController,_$httpBackend_){
// get data with $httpBackend,responding with example data
            $httpBackend=_$httpBackend_;
            $httpBackend.expectGET('/home').respond(taskData);
            ctrl=$componentController('homePage');
        }));
        it('should get task list via $httpBackend',function(){
// should be undefined befor flush call
            expect(ctrl.tasks).toBeUndefined();
            $httpBackend.flush();
// should be equal to example data
            expect(ctrl.tasks).toEqual(taskData);
        });
    });
});
