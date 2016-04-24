angular.module('dumboApp')
.controller('LoginCtrl', function ($scope, userDataService, SweetAlert, userService,$routeParams) {
    var id = $routeParams.id;
    var key = $routeParams.key;
    var action = $routeParams.action;
    $scope.init = function() {
        if (id && key && action=="confirm"){
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
        if (id && key && action=="recover"){
            $scope.resetPassword();
        }
    };

    $scope.resetPassword = function() {
        swal.withForm({  title: "Create a new password",
        text: "Enter your new password:",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        confirmButtonText: "Reset Password",
        showLoaderOnConfirm: true,
        formFields: [
            { id: 'password', placeholder:'Password', type:'password' },
            { id: 'confirmpass', placeholder:'Password confirmation', type:'password' }
        ]
    },
    function(){
        var password = this.swalForm.password;
        var confirmpass = this.swalForm.confirmpass;
        if (password === false || confirmpass === false) return false;
        if (password === "") {
            swal.showInputError("Please enter a password");
            return false
        }
        if (confirmpass === "") {
            swal.showInputError("Please confirm your password");
            return false
        }
        if (password != confirmpass){
            swal.showInputError("Password and confirmation do not match");
            return false
        }
        swal("We're resetting your password", "Just a moment");
        userDataService.changePassword(id, key, password, confirmpass).then(
            function success(res){
                swal("Your password has been reset", "Please login to continue" , "success");
            },
            function failure(res){
                SweetAlert.swal("I'm sorry I can't do that", res.data.message, "error");
            }

        )
    });
};

$scope.forgotPassword = function() {
    swal({  title: "Forgot your password?",
    text: "Enter your email address:",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    confirmButtonText: "Reset Password",
    inputPlaceholder: "me@tufts.edu",
    showLoaderOnConfirm: true
},
function(email){
    if (email === false) return false;
    if (email === "") {
        swal.showInputError("Please enter your email address");
        return false
    }
    swal("We're resetting your password", "Just a moment");
    userDataService.recoverPasswordByEmail(email).then(
        function success(res){
            swal("Please check your email", "We emailed you a link to reset your password" , "success");
        },
        function failure(res){
            SweetAlert.swal("I'm sorry I can't do that", res.data.message, "error");
        }

    )
});
};

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
