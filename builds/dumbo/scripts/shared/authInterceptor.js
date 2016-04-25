angular.module('dumboApp')
    .factory('authInterceptor', function($q, $location) {
      return {
        responseError: function(rejection) {
            console.log("change")
            if (rejection.status === 403) {
                $location.path('/login').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }
});
