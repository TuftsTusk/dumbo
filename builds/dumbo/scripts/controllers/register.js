angular.module('dumboApp')
  .controller('RegistrationCtrl', function ($scope, userDataService, SweetAlert) {
    $scope.register = function(){
      $scope.dataLoading = true;
      userDataService.register($scope.user).then(
      function success(res){
        $scope.dataLoading = false;
        SweetAlert.swal("Congrats!", "Check your email to verify your new account", "success");
        console.log("For now please manually register using the following details:")
        console.log(res.data);
      },
      function failure(res){
        $scope.dataLoading = false;
        SweetAlert.swal("One little thing", res.data.message, "error");
      });
      };
  });
