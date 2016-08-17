'use strict';

angular.module('dumboApp')
.controller('multiLayout', function ($scope, listingDataService, $route, LISTING, $location) {
	$scope.listings = {};
	$scope.listings.error = true;
	$scope.listingType = $route.current.$$route.listingType;
	$scope.LISTING = LISTING;


	$scope.init = function(){
		listingDataService.getListings()
		.then(function success(request){
			$scope.listings = request.data;
			$scope.listings.error = false;
		}, function failure(request){
			$scope.listings.error = true;
		})
	}
	$scope.viewListing = function(uid){
		$location.path('/listing/' + uid);
	}

})
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
	$mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
	$mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
	$mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
