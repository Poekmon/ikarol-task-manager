/**
*  top-menu component
*
* Description
* Nav bar with 2 options:
* 1)Home page
* 2)Lists of tasks
*/
angular.module('topMenu')
  .component('topMenu',{
// component's template path
    templateUrl: 'top-menu/top-menu.template.html',
    controller: function($scope,$route){
// $scope and $route for interactions with nav bar
        this.nav=[
// navbar element properties
          {
            'name': 'Home page',
            'link': '#!/home',
            'tab': 'home'
          },
          {
            'name': 'Lists of tasks',
            'link': '#!/list',
            'tab': 'list'
          }
        ];
// for desing purposes
        $scope.$route=$route;
    },
// component's controller alias
    controllerAs: 'tmCtrl'
});
