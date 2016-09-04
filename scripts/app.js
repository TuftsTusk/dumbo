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
	'mgcrea.ngStrap',
	'uiGmapgoogle-maps',
	'google.places'
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
	.when('/books/new', {
		templateUrl: 'views/newListing.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType:'BookListing'
	})
	.when('/books' , {
		templateUrl: 'views/multiLayout.html',
		listingType: 'BookListing'
	})
	.when('/furniture/new', {
		templateUrl: 'views/newListing.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType:'FurnitureListing'
	})
	.when('/furniture' , {
		templateUrl: 'views/multiLayout.html',
		listingType: 'FurnitureListing'
	})
	.when('/misc/new', {
		templateUrl: 'views/newListing.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType:'MiscListing'
	})
	.when('/miscellaneous/new', {
		templateUrl: 'views/newListing.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType:'MiscListing'
	})
	.when('/misc' , {
		templateUrl: 'views/multiLayout.html',
		listingType: 'MiscListing'
	})
	.when('/sublets' , {
		templateUrl: 'views/multiLayout.html',
		listingType: 'SubletListing'
	})
	.when('/sublets/:action', {
		templateUrl: 'views/singleListing.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType: 'SubletListing'
	})
	.when('/sublets/:id/:action', {
		templateUrl: 'views/singleListing.html',
		resolve: {
			loggedIn: requireLogin
		},
		listingType: 'SubletListing'
	})
	.when('/about', {
		templateUrl: 'views/about.html'
	})
	.when('/listing/:id', {
		templateUrl: 'views/view_post.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/listing/search/:searchTerm' , {
		templateUrl: 'views/multiLayout.html',
	})
	.when('/listing/search/:searchTerm/type/:listingType' , {
		templateUrl: 'views/multiLayout.html',
	})
	.when('/listing/:id/edit',{
		templateUrl: 'views/newListing.html',
		resolve: {
			loggedIn: requireLogin
		}
	})
	.when('/me/listing', {
		templateUrl: 'views/multiLayout.html',
		resolve: {
			loggedIn: requireLogin
		},
		myListings: true
	})
	.when('/me/:action/:id/:key/', {
		templateUrl: 'views/login.html'
	})
	.when('/terms' , {
		templateUrl: 'views/terms.html'
	})
	.when('/privacy' , {
		templateUrl: 'views/privacy.html'
	})
	.otherwise({
		templateUrl: '404.html'
	});
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.interceptors.push('authInterceptor');
});

app.config(['ngToastProvider', function(ngToast) {
	ngToast.configure({
		verticalPosition: 'bottom',
		horizontalPosition: 'right',
		maxNumber: 3,
		animation: "fade",
		combineDuplications:true
	});
}]);


app.run(function($rootScope, $location, EnvironmentConfig, ngToast) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.loaded = false;
		if (EnvironmentConfig.locked){
			if ($location.path() != '/'){
				ngToast.create({
					className: 'info',
					content: "Happy you're excited too! We will be here soon!",
					timeout: 5000
				});
			}
			$location.path('/');
		}
	});
	$rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
		$rootScope.loaded = true;
	});
});


app.constant("LISTING", {
	"MAXSUMMARYLENGTH": "200"
})

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
}]);
