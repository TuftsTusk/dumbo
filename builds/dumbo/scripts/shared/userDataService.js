angular.module('dumboApp')
    .service('userDataService', function($http,$q) {

  var host = 'http://localhost';
  var registration = '/user/register';
  var login = '/user/login';
  var logout = '/user/logout';
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
});
