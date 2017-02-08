// unit test for listOfTasks component
describe('listOfTasks',function(){
    beforeEach(module('contentPart'));
    describe('ListOfTasksController',function(){
// $httpBackend for mock testing
        var $httpBackend,ctrl;
// example data
        var taskData=[
          {
            severity: 1,
            name: 'Test this component',
            completed: true,
            isEditing: false,
            tempTask: ''
          },
          {
            severity: 2,
            name: 'Test methods',
            completed: false,
            isEditing: false,
            tempTask: ''
          },
          {
            severity: 3,
            name: 'Test variables',
            completed: false,
            isEditing: false,
            tempTask: ''
          }
        ];
// should get example data via $httpBackend
        beforeEach(inject(function($componentController,_$httpBackend_){
            $httpBackend=_$httpBackend_;
            $httpBackend.expectGET('/list').respond(taskData);
            ctrl=$componentController('listOfTasks');
        }));
// tasks should be undefined until flush call
// after flush tasks should be equal to example data
        it('should store data to tasks variable',function(){
            expect(ctrl.tasks).toBeUndefined();
            $httpBackend.flush();
            expect(ctrl.tasks).toEqual(taskData);
        });
    });
});
