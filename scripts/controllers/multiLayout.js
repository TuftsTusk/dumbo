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
	};

	$scope.viewListing = function(uid){
		console.log(uid);
		$location.path('/listing/' + uid);
	};

})
