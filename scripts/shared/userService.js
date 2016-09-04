angular.module('dumboApp')
    .factory('userService', function($cookies) {

  var loggedIn = false;
  var email = null;
  return {
    setLoggedIn : function(userEmail){
      var expiration = new Date();
      expiration.setDate(expiration.getDate() + 7);
      $cookies.put('email', userEmail, {'expires':expiration});
    },
    isLoggedIn : function() {
      var c = $cookies.get('email');
      return (c != null && c != "undefined");
    },
    requestEmail : function() {
      return $cookies.get('email');
    },
    setLoggedOut: function(userEmail){
      var cookies = $cookies.getAll();
      angular.forEach(cookies, function (v, k) {
          $cookies.remove(k);
      });
    }
  }
});
