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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/create_post', {
        templateUrl: 'views/create_post.html',
        controller: 'CreatePostCtrl',
        controllerAs: 'createPost'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
