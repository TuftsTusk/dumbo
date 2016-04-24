angular.module('dumboApp')
.service('userDataService', function($http,$q, EnvironmentConfig) {

    var host = EnvironmentConfig.api;
    var registration = '/me/register';
    var login = '/me/login';
    var logout = '/me/logout';
    var user = '/user/';
    var confirm = '/confirm?key=';
    var resendConfirmation = '/me/resendConfirmation';
    var recoverPassword = '/recover';
    var modifyPassword = '/me/password';
    delete $http.defaults.headers.common['X-Requested-With'];
    this.register = function(user) {
        return $http.post(host + registration, user);
    }
    this.login = function(user) {
        return $http.post(host + login, user);
    }
    this.logout = function() {
        return $http.post(host + logout);
    }
    this.confirmAccount = function(id, key) {
        return $http.get(host + user + id + confirm + key);
    }
    this.resendConfirmation = function(email) {
        return $http.post(host + resendConfirmation, {'email': email});
    }
    this.recoverPasswordByEmail = function(email){
        return $http.post(host + user + email + recoverPassword);
    }
    this.changePassword = function(userid, confirmkey, password, confirmpass){
        return $http.put(host + modifyPassword, {'user_id':userid, 'confirm_key':confirmkey,
                                                'password':password, 'confirmpass':confirmpass});
    }
});
