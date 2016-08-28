'use strict';

angular.module('dumboApp')
.controller('multiLayout', function ($scope, listingDataService, listingMap, $route, LISTING, $location, ngToast, $routeParams) {
	$scope.listings = {};
	$scope.listings.error = true;
	$scope.listingType = $route.current.$$route.listingType || $routeParams.listingType;
	$scope.listingDisplayType = listingMap.getListingTypeByType($scope.listingType);
	$scope.LISTING = LISTING;
	$scope.searchTerm = $routeParams.searchTerm;
	$scope.myListings = $route.current.$$route.myListings;


	$scope.init = function(){
		if ($scope.myListings){
			listingDataService.getMeListing()
			.then(function success(request){
				$scope.listings = request.data;
				$scope.listings.error = false;
			}, function failure(request){
				$scope.listings.error = true;
			})
		} else {
			listingDataService.getListingsByType($scope.listingType, $scope.searchTerm)
			.then(function success(request){
				$scope.listings = request.data;
				$scope.listings.error = false;
			}, function failure(request){
				$scope.listings.error = true;
			})
		}

		//update UI for searching
		$scope.searchInput = $scope.searchTerm;
	};

	$scope.viewListing = function(uid){
		if (uid == undefined || uid ==null){
			///TODO: Send Goolge Analytics event for this failure
			ngToast.create({
				className: 'warning',
				content: "Post is currently unavailable. Please try again later.",
				timeout: 3000
			});
		} else {
			if ($scope.listingType == 'SubletListing'){
				$location.path('/sublets/' + uid);
			} else {
				$location.path('/listing/' + uid);
			}
		}
	};

})
