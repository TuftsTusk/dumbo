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
	'ui.bootstrap',
	'angular-loading-bar'
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
		templateUrl: 'views/coming_soon.html'
	})
	.when('/me/listing', {
		templateUrl: ''
	})
	.when('/me/:action/:id/:key/', {
		templateUrl: 'views/login.html'
	})
	.when('/subletListing', {
		redirectTo: '/subletListing/new'
	})
	.when('/subletListing/:action', {
		templateUrl: 'views/singleListing.html'
	})
	.when('/subletListing/:id/:action', {
		templateUrl: 'views/singleListing.html'
	})
	.when('/listing/:id', {
		templateUrl: 'views/coming_soon.html'
	})
	.when('/settings', {
		redirectTo: '/settings/account'
	})
	.when('/settings/:page', {
		templateUrl: 'views/settings.html'
	})
	.when('/sublet' , {
		templateUrl: 'views/view_sublet.html'
	})
	.when('/terms' , {
		templateUrl: 'views/terms.html'
	})
	.when('/privacy' , {
		templateUrl: 'views/privacy.html'
	})
    .when('/books' , {
		templateUrl: 'views/coming_soon.html'
	})
    .when('/misc' , {
		templateUrl: 'views/coming_soon.html'
	})
    .when('/furniture' , {
		templateUrl: 'views/coming_soon.html'
	})
	.otherwise({
		templateUrl: '404.html'
	});
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.interceptors.push('authInterceptor');
});
