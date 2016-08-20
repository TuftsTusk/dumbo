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
	if (!userService.isLoggedIn()){
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
	'oitozero.ngSweetAlert',
	'dumboApp.config',
	'LocalStorageModule',
	'underscore',
	'ui.bootstrap',
	'angular-loading-bar',
	'ngToast',
	'ngMaterial',
	'infinite-scroll',
	'mgcrea.ngStrap'
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
		templateUrl: 'views/grid_view.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/listing/:id/edit',{
		templateUrl: 'views/newListing.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/me/listing', {
		templateUrl: 'views/myListings.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/me/:action/:id/:key/', {
		templateUrl: 'views/login.html'
	})
	.when('/SubletListing', {
		redirectTo: '/subletListing/new',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/SubletListing/:action', {
		templateUrl: 'views/singleListing.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/SubletListing/:id/:action', {
		templateUrl: 'views/singleListing.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/listing/:id', {
		templateUrl: 'views/view_post.html',
//		resolve: {
//			loggedIn: requireLogin
//		}
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
	.when('/sublets' , {
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
		templateUrl: 'views/multiLayout.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType: 'books'
	})
	.when('/misc' , {
		templateUrl: 'views/multiLayout.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType: 'misc'
	})
	.when('/furniture' , {
		templateUrl: 'views/multiLayout.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType: 'furniture'
	})
	.when('/gridlist' , {
		templateUrl: 'views/gridList.html',
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


app.constant("LISTING", {
	"MAXSUMMARYLENGTH": "200"
})


app.config(['ngToastProvider', function(ngToast) {
	ngToast.configure({
		verticalPosition: 'top',
		horizontalPosition: 'center',
		maxNumber: 3,
		animation: "fade"
	});
}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
}]);
