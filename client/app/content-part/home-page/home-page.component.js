/**
*  home page component
*
* Description
* Displaying when on home page
*/
angular.module('contentPart')
  .component('homePage',{
// component's template path
    templateUrl: 'content-part/home-page/home-page.template.html',
    controller: function(openedTasks,$http){
// openedTasks service for counting opened tasks
// $http for making get http request
        var self=this;
        $http.get('/home').success(function(response){
// get list of tasks and display number of open tasks
             self.tasks=response;
             self.openTasks=openedTasks.countOpenTasks(self.tasks);
        });
// display current date
        this.date=new Date();
    },
// component's controller alias
    controllerAs: 'hpCtrl'
  });
