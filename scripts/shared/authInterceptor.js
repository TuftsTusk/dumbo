angular.module('dumboApp')
    .factory('authInterceptor', function($q, $location, ngToast, userService, EnvironmentConfig, $injector) {
      return {
        responseError: function(rejection) {
          var host = EnvironmentConfig.api;
          var logout = '/me/logout';
          var http = $injector.get('$http');
          var prevUrl = $location.path();
          if (rejection.status === 403 && prevUrl != '/login/existinguser') {
            http.post(host + logout).then(function(){
              userService.setLoggedOut();
              $location.path('/login/existinguser').search('returnTo', prevUrl);
              ngToast.create({
                className: 'info',
                content: 'Please login or register to continue',
                timeout: 3000
              });
            })
          }
          return $q.reject(rejection);
        }
    }
});
