angular.module('dumboApp').controller('LoginCtrl',
    function ($scope, userDataService, SweetAlert, userService,$routeParams, $location, ngToast) {
        var id = $routeParams.id;
        var key = $routeParams.key;
        var action = $routeParams.action;
        var loginType = $routeParams.loginType;

        $scope.init = function() {
            //setup page actions
            if (loginType=="newuser") {
                $scope.newuser = true;
            } else {
                $scope.newuser= false;
            }
            if (id && key && action=="confirm") {
                userDataService.confirmAccount(id,key).then(function(data) {
                    SweetAlert.swal({
                        title: "Welcome!",
                        text: "Your account is confirmed. Please log in.",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }, function(data) {
                    SweetAlert.swal({
                        title: "Sorry",
                        text: "Please check your email, your account was not confirmed",
                        timer: 2000,
                        showConfirmButton: false
                    });
                })
            }
            if (id && key && action=="recover") {
                $scope.resetPassword();
            }
        };

        $scope.resetPassword = function() {
            swal.withForm({
                title: "Create a new password",
                text: "Enter your new password:",
                type:'input',
                inputType: "password",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                confirmButtonText: "Reset Password",
                showLoaderOnConfirm: true,
            },
            function(newPassword) {
                var password = newPassword;
                var confirmpass = newPassword;
                if (password === false || confirmpass === false) return false;
                if (password === "") {
                    swal.showInputError("Please enter a password");
                    return false;
                }
                if (confirmpass === "") {
                    swal.showInputError("Please confirm your password");
                    return false;
                }
                if (password != confirmpass) {
                    swal.showInputError("Password and confirmation do not match");
                    return false;
                }
                swal("We're resetting your password", "Just a moment");
                userDataService.changePassword(id, key, password, confirmpass).then(
                    function success(res) {
                        swal("Your password has been reset", "Please login to continue" , "success");
                    },
                    function failure(res) {
                        SweetAlert.swal("I'm sorry I can't do that", res.data.message, "error");
                    }
                );
            });
        };

        $scope.forgotPassword = function() {
            swal({
                title: "Forgot your password?",
                text: "Enter your email address:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                confirmButtonText: "Reset Password",
                inputPlaceholder: "me@tufts.edu",
                showLoaderOnConfirm: true
            },
            function(email) {
                if (email === false) return false;
                if (email === "") {
                    swal.showInputError("Please enter your email address");
                    return false
                }
                swal("We're resetting your password", "Just a moment");
                userDataService.recoverPasswordByEmail(email).then(
                    function success(res) {
                        swal("Please check your email", "We emailed you a link to reset your password" , "success");
                    },
                    function failure(res) {
                        SweetAlert.swal("Something went wrong. Please check the email address and try again.", res.data.message, "error");
                    }
                );
            });
        };

        var login = function(){
            $scope.dataLoading = true;
            userDataService.login($scope.user).then(
                function success(res) {
                    userService.setLoggedIn($scope.user.email);
                    $scope.dataLoading = false;
                    var returnTo = $routeParams.returnTo;
                    $location.path(returnTo || '/');
                    ngToast.create({
                        className: 'success',
                        content: 'You have succesfully logged in',
                        timeout: 3000
                    });
                },
                function failure(res) {
                    $scope.dataLoading = false;
                    if (res.status === -1 || !res.data || !res.data.message) {
                    SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
                    } else {
                        if (res.data.type == 'USER_NOT_CONFIRMED_FAILURE') {
                            swal({
                                title: "Your account isn't confirmed yet.",
                                type: "info",
                                confirmButtonText: "Resend confirmation email",
                                showCancelButton: true,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true
                            }, function() {
                                setTimeout(function() {
                                    userDataService.resendConfirmation($scope.user.email).then(
                                        function success(res){
                                            swal("Please check your email to confirm your account.");
                                        },
                                        function failure(res){
                                            SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
                                        }
                                    );
                                }, 2000);
                            });
                        } else {
                            SweetAlert.swal("I'm sorry I can't do that", res.data.message, "error");
                        }
                    }
                }
            );
        };

        var register = function() {
            $scope.dataLoading = true;
            userDataService.register($scope.user).then(
                function success(res) {
                    $scope.dataLoading = false;
                    $location.path('/');
                    if (res.status == 200) {
                        // A status of 200 implies we got a response body... this only happens when an email
                        // was not sent as we are on a development server-204 is returned in that case
                        var conf_url = userDataService._confirmAccountURL(res.data.id, res.data.key);
                        SweetAlert.swal({
                                title: "Proceed to Account Confirmation?",
                                text: "This will confirm your new account.",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, confirm it!",
                                closeOnConfirm: false,
                                closeOnCancel: true
                            },
                            function(willConfirm) {
                                if (willConfirm) {
                                    userDataService.confirmAccount(res.data.id, res.data.key).then(
                                        function success(conf_res) {
                                            SweetAlert.swal("Confirmed", "The new account was successfully confirmed.", "success");
                                        },
                                        function failure(conf_res) {
                                            SweetAlert.swal("Confirmation Failure", "The new account could not be confirmed.", "error");
                                        }
                                    );
                                }
                            });
                    } else if (res.status == 204) {
                        SweetAlert.swal("Welcome", "Check your email to verify your new account", "success");
                    } else {
                        SweetAlert.swal("Unexpected Status!", "Received an unknown status: " + res.status);
                    }
                },
                function failure(res) {
                    $scope.dataLoading = false;
                    if (res.status === -1) {
                        SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
                    } else {
                        SweetAlert.swal("One little thing...", res.data.message, "error");
                    }
                }
            );
        }

        $scope.handleForm = function(context) {
            if ($scope.newuser) {
                //Assume register
                register();
            } else {
                //Assume login
                login();
            }
        }
    }
);
