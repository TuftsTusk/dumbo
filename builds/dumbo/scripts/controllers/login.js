angular.module('dumboApp')
  .controller('LoginCtrl', function ($scope, userDataService, SweetAlert, userService) {
    $scope.login = function(){
      $scope.dataLoading = true;
      userDataService.login($scope.user).then(
      function success(res){
        userService.setLoggedIn($scope.user.email);
        $scope.dataLoading = false;
        SweetAlert.swal("Congrats!", "Welcome to Tusk Marketplace.", "success");
      },
      function failure(res){
        $scope.dataLoading = false;
        SweetAlert.swal("I'm sorry I can't do that", res.data.message, "error");
      });
      };
  });
