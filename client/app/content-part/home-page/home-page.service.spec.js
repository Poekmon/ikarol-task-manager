// test for openedTasks service
describe('openedTasks',function(){
// example data
    var tasksList=[
      {
        name:'Test this service',
        completed: true
      },
      {
        name:'Conquer the world',
        completed: false
      }];
    var openedTasks;
    beforeEach(module('contentPart'));
// calling openedTasks service
    beforeEach(inject(function(_openedTasks_){
      openedTasks=_openedTasks_;
    }));
// check does openedTasks service has countOpenedTasks function
    it('should have countOpenedTasks function',function(){
        expect(angular.isFunction(openedTasks.countOpenTasks)).toBe(true);
    });
// should count only one open task
    it('should show one uncompleted task',function(){
        expect(openedTasks.countOpenTasks(tasksList)).toBe(1);
    });
});
