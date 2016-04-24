angular.module('dumboApp')
  .controller('RegistrationCtrl', function ($scope, userDataService, SweetAlert, $location) {
    $scope.register = function(){
      $scope.dataLoading = true;
      userDataService.register($scope.user).then(
      function success(res){
        $scope.dataLoading = false;
        $location.path('/');
        SweetAlert.swal("Welcome", "Check your email to verify your new account", "success");
      },
      function failure(res){
        $scope.dataLoading = false;
        if (res.status === -1) {
          SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
        } else {
          SweetAlert.swal("One little thing", res.data.message, "error");
        }
      });
      };
  });
