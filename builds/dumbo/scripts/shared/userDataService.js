angular.module('dumboApp')
    .service('userDataService', function($http,$q, EnvironmentConfig) {

  var host = EnvironmentConfig.api;
  var registration = '/me/register';
  var login = '/me/login';
  var logout = '/me/logout';
  var user = '/user/';
  var confirm = '/confirm?key=';
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
    return $http.post(host + user + id + confirm + key);
  }
});
