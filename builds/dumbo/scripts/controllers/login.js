angular.module('dumboApp')
.controller('LoginCtrl', function ($scope, userDataService, SweetAlert, userService,$routeParams) {
    var id = $routeParams.id;
    var key = $routeParams.key;

    if (id && key){
        userDataService.confirmAccount(id,key).then(function(data){
            SweetAlert.swal({title: "Welcome!",
            text: "Your account is confirmed. Please log in.",
            timer: 2000,
            showConfirmButton: false });

        }, function(data){
            SweetAlert.swal({title: "Sorry",
            text: "Please check your email, your account was not confirmed",
            timer: 2000,
            showConfirmButton: false });
        })
    }
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
                console.log($scope.user);
                if (res.status === -1 || !res.data || !res.data.message) {
                    SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
                } else {
                    if (res.data.type == 'USER_NOT_CONFIRMED_FAILURE'){
                        swal({title: "Looks like your account isn't confirmed",
                        text: "Click to resend confirmation email",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true, },
                        function(){
                            setTimeout(function(){
                                userDataService.resendConfirmation($scope.user.email).then(
                                    function success(res){
                                        swal("Please check your email to confirm your account.");
                                    },
                                    function failure(res){
                                        SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
                                    }
                                )

                            }, 2000); });
                    } else {
                        SweetAlert.swal("I'm sorry I can't do that", res.data.message, "error");
                    }

                }
            });
        };
    });
