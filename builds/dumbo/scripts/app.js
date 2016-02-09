'use strict';

/**
 * @ngdoc overview
 * @name dumboApp
 * @description
 * # dumboApp
 *
 * Main module of the application.
 */
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
    'dumboApp.config'
  ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/' , {
                templateUrl: 'views/home.html'
            })
            .when('/home' , {
                templateUrl: 'views/home.html'
            })
            .when('/login' , {
                templateUrl: 'views/login.html'
            })
            .when('/register' , {
                templateUrl: 'views/register.html'
            })
            .when('/newListing', {
                templateUrl: 'views/newListing.html'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .when('/listings', {
                templateUrl: 'views/listings.html'
            })
            .when('/welcome' , {
                templateUrl: 'views/welcome.html'
            })

            .otherwise({
                templateUrl: '404.html'
            });
        $httpProvider.defaults.withCredentials = true;
    });
