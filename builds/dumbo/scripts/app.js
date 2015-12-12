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
    'ngTouch'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/welcome'
            })
            .when('/main' , {
                templateUrl: 'views/main.html'
            })
            .when('/create_post', {
                templateUrl: 'views/create_post.html'
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
                redirectTo: '/'
            });
    });