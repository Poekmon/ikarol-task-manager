// service for counting open tasks
angular.module('contentPart')
  .service('openedTasks',function(){
    this.countOpenTasks=function(array){
// method for counting
        var counter=0;
        angular.forEach(array,function(value){
            angular.forEach(value,function(v,k){
// if task has key completed and value false
              if(!v && k==='completed'){
                counter++;
              }
            });
        });
        return counter;
    };
  });
