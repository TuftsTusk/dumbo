'use strict';

angular.module('dumboApp')
.controller('multiLayout', function ($scope, listingDataService, listingMap, $route, LISTING, $location, ngToast) {
	$scope.listings = {};
	$scope.listings.error = true;
	$scope.listingType = $route.current.$$route.listingType;
	$scope.listingDisplayType = listingMap.getListingTypeByType($scope.listingType);
	$scope.LISTING = LISTING;


	$scope.init = function(){
		listingDataService.getListingsByType($scope.listingType)
		.then(function success(request){
			$scope.listings = request.data;
			$scope.listings.error = false;
		}, function failure(request){
			$scope.listings.error = true;
		})
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
