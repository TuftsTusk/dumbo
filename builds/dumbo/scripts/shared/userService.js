angular.module('dumboApp')
    .factory('userService', function($cookies) {

  var loggedIn = false;
  var email = null;
  return {
    setLoggedIn : function(userEmail){
      $cookies.put('email', userEmail);
    },
    isLoggedin : function() {
      return ($cookies.get('email') != undefined);
    },
    requestEmail : function() {
      return $cookies.get('email');
    },
    setLoggedOut: function(userEmail){
      $cookies.remove('email');
    }
  }
});
