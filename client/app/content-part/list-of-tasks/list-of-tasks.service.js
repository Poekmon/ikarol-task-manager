// service for using constant
// should inject constant
// and then return it's value
angular.module('contentPart')
  .factory('setSeverity', ['defaultSeverity', function(defaultSeverity){
      return defaultSeverity;
  }]);
