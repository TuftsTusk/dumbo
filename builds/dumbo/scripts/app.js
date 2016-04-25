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

var requireLogin = function(userService, $location, ngToast){
	if (!userService.isLoggedin()){
		$location.path('/login/existing');
		ngToast.create({
		  className: 'info',
		  content: 'Please login or register to continue',
		  timeout: 3000
		});
	}
}

var app = angular
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
	'angular-loading-bar',
	'ngToast'
])
.config(function ($routeProvider, $httpProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html'
	})
	.when('/home', {
		templateUrl: 'views/home.html'
	})
	.when('/login/:loginType', {
		templateUrl: 'views/login.html'
	})
	.when('/newListing', {
		templateUrl: 'views/newListing.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/about', {
		templateUrl: 'views/about.html'
	})
	.when('/listing', {
		templateUrl: 'views/coming_soon.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/me/listing', {
		templateUrl: '',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/me/:action/:id/:key/', {
		templateUrl: 'views/login.html'
	})
	.when('/subletListing', {
		redirectTo: '/subletListing/new',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/subletListing/:action', {
		templateUrl: 'views/singleListing.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/subletListing/:id/:action', {
		templateUrl: 'views/singleListing.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/listing/:id', {
		templateUrl: 'views/coming_soon.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/settings', {
		redirectTo: '/settings/account',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/settings/:page', {
		templateUrl: 'views/settings.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/sublet' , {
		templateUrl: 'views/view_sublet.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/terms' , {
		templateUrl: 'views/terms.html'
	})
	.when('/privacy' , {
		templateUrl: 'views/privacy.html'
	})
	.when('/books' , {
		templateUrl: 'views/coming_soon.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/misc' , {
		templateUrl: 'views/coming_soon.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/furniture' , {
		templateUrl: 'views/coming_soon.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.otherwise({
		templateUrl: '404.html'
	});
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.interceptors.push('authInterceptor');
});


app.config(['ngToastProvider', function(ngToast) {
	ngToast.configure({
		verticalPosition: 'top',
		horizontalPosition: 'center',
		maxNumber: 3,
		animation: "fade"
	});
}]);
