angular.module('dumboApp')
.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){

      el.bind("change", function(e){

        $scope.files = (e.srcElement || e.target).files;
        $scope.getFiles();
      })
    }
  }
});
