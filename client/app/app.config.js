/**
*  config for main module
*
* Description
* Routing with 2 different pathes:
* 1)home page
* 2)list page with number of tasks
*/
angular.module('taskManager')
  .config(['$locationProvider','$routeProvider'
    ,function($locationProvider,$routeProvider) {
      $locationProvider.hashPrefix('!');
// using ! prefix
      $routeProvider
// routes with params:
// 1)template for ngView directive
// 2)activetab for design purposes
        .when('/home',{
          template: '<home-page></home-page>',
          activetab: 'home'
        })
        .when('/list',{
          template: '<list-of-tasks></list-of-tasks>',
          activetab: 'list'
        })
        .otherwise('/home');
}]);
