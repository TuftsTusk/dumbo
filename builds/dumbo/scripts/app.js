'use strict';

/**
 * @ngdoc overview
 * @name dumboApp
 * @description
 * # dumboApp
 *
 * Main module of the application.
 */

var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    return window._; //Underscore should be loaded on the page
});


angular
    .module('dumboApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'oitozero.ngSweetAlert',
    'dumboApp.config',
    'LocalStorageModule',
    'underscore',
	'ui.bootstrap'
  ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/home', {
                templateUrl: 'views/home.html'
            })
            .when('/login', {
                templateUrl: 'views/login.html'
            })
            .when('/register', {
                templateUrl: 'views/register.html'
            })
            .when('/newListing', {
                templateUrl: 'views/newListing.html'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .when('/listing', {
                templateUrl: 'views/grid_view.html'
            })
      			.when('/mylistings/listing/:id' , {
      				redirectTo: '/mylistings/listing/:id/general'
      			})
      			.when('/mylistings/listing/:id/:path' , {
      				templateUrl: 'views/singleListing.html'
      			})
            .when('/listing/:id' , {
                templateUrl: 'views/view_post.html'
            })
            .when('/settings' , {
      				redirectTo: '/settings/account'
            })
      			.when('/settings/:page' , {
      				templateUrl: 'views/settings.html'
      			})
            .when('/sublet' , {
      				templateUrl: 'views/view_sublet.html'
      			})

          .otherwise({
              templateUrl: '404.html'
          });
          $httpProvider.defaults.withCredentials = true;
          $httpProvider.interceptors.push('authInterceptor');
      });
