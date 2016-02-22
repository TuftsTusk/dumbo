angular.module('dumboApp')
    .factory('authInterceptor', function($q, $location) {
      return {
        responseError: function(rejection) {
            if (rejection.status === 403) {
                console.log("Response Error 403",rejection);
                $location.path('/login').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }

});
