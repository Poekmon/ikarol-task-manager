/**
*  list of tasks component
*
* Description
* Displaying while on lists of tasks page
*/
angular.module('contentPart')
  .component('listOfTasks',{
// component's template path
    templateUrl: 'content-part/list-of-tasks/list-of-tasks.template.html',
// setSeverity service for storing defaultSeverity constant
// $http for CRUD requests
    controller: function(setSeverity,$http){
        var self=this;
// refresh tasks list by GET request
        var loadList=function(){
            $http.get('/list').success(function(response){
                self.tasks=response;
            });
        };
// refreshing tasks list
        loadList();
// values for severity
        self.severity=[1,2,3,4,5];
// text stored with value in severity
        self.sevV=setSeverity;
// name of task value
// for creating task
        self.nameV='';
// selecting specific value in severity option list
        self.selectVal=function(val){
            self.sevV=val;
        };
// swiching modes between edit mode and normal
        self.changeMode=function(task){
                task.isEditing=!task.isEditing;
                task.tempTask=task.name;
        };
// for Create task button validation
        self.taskValidation=function(){
                return self.sevV===setSeverity || self.nameV==='';
        };
// saving task via PUT request
// after its done-refreshing task list
        self.saveTask=function(id,task){
            $http.put('/lists/'+id,task).success(function(){
                task.name=task.tempTask;
                task.isEditing=false;
            });
        };
// validation for Save button on edit mode
        self.editValidation=function(param){
            return param==='';
        };
// deleting task via DELETE request
// after that refreshing the task list
        self.delete=function(id,task){
            $http.delete('/list/' + id).success(function(){
                task.isEditing=false;
                self.tasks.splice(self.tasks.indexOf(task),1);
            });
        };
// add task via POST request
// after its done-refresh list and set input's values to none
        self.addTask=function(){
            self.task={
                'severity': self.sevV,
                'name': self.nameV,
                'completed': false,
                'isEditing': false,
                'tempTask': self.nameV
            };
            $http.post('/list',self.task).success(function(resp){
                self.task._id=resp.insertedIds;
                self.tasks.push(self.task);
            });
            self.sevV=setSeverity;
            self.nameV='';
        };
// updating comletion status via PUT request
        self.updateComp=function(task){
             $http.put('/list/'+task._id,task).success(function(){
             });
        };
//sorting task list by severity value
//on Severity button click reverse the order
        self.sortOrd=false;
        self.sortBySev='severity';
        self.sort=function(){
            self.sortOrd=!self.sortOrd;
        };
    },
// component's controller alias
    controllerAs: 'lotCtrl'
  });
