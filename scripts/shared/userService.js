angular.module('dumboApp')
    .factory('userService', function($cookies) {

  var loggedIn = false;
  var email = null;
  return {
    setLoggedIn : function(userEmail){
      $cookies.put('email', userEmail);
    },
    isLoggedIn : function() {
      var c = $cookies.get('email');
      return (c != null && c != "undefined");
    },
    requestEmail : function() {
      return $cookies.get('email');
    },
    setLoggedOut: function(userEmail){
      $cookies.remove('email');
    }
  }
});
