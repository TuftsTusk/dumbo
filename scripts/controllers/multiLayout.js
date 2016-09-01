'use strict';

angular.module('dumboApp')
.controller('multiLayout', function ($scope, listingDataService, listingMap, $route, LISTING, $location, $anchorScroll, ngToast, $routeParams, uiGmapGoogleMapApi, uiGmapIsReady, $timeout) {
	$scope.listings = {};
	$scope.listings.error = true;
	$scope.listingType = $route.current.$$route.listingType || $routeParams.listingType;
	$scope.listingDisplayType = listingMap.getListingTypeByType($scope.listingType);
	$scope.LISTING = LISTING;
	$scope.searchTerm = $routeParams.searchTerm;
	$scope.myListings = $route.current.$$route.myListings;

	$scope.init = function(){
		$scope.mapLoaded = false;
		$scope.map = {
			center: {
				latitude: 42.4074843,
				longitude: -71.1190232
			},
			zoom: 14,
			markers: [],
			markersEvents: {
				click: function(marker, eventName, listing) {
					$scope.map.center = listing;
					$scope.map.window.listing = listing;
					$scope.map.window.show = true;
					$("#" + listing.id)[0].scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
					$scope.selectedId = listing.id;
				}
			},
			window: {
				marker: {},
				show: false,
				closeClick: function() {
					this.show = false;
				},
				options: {}
			}
		};

		$scope.clickListing = function(listing, type){
			if (type != 'SubletListing'){
				return;
			}
			var marker = $scope.map.markers.find(function (o) { return o.id == listing._id; });
			$scope.map.window.listing = listing;
			$scope.map.markersEvents.click(null, null, marker);
		}

		uiGmapGoogleMapApi.then(function(maps) {
			$timeout(function(){
				$scope.mapLoaded = true;
			}, 100);
			$scope.maps = maps;
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

					//add markers
					if ($scope.listingType == 'SubletListing'){
						for (var i=0; i < $scope.listings.length; i++){
							var ret = {
								id:$scope.listings[i].listing._id,
								latitude: $scope.listings[i].listing.apt_info.lat,
								longitude: $scope.listings[i].listing.apt_info.lng,
								listing:$scope.listings[i].listing
							};
							$scope.map.markers.push(ret);
						}
					}

				}, function failure(request){
					$scope.listings.error = true;
				})
			}
		});

		//update UI for searching
		$scope.searchInput = $scope.searchTerm;
	};

	$scope.viewListing = function(uid, type){
		if (uid == undefined || uid ==null){
			///TODO: Send Google Analytics event for this failure
			ngToast.create({
				className: 'warning',
				content: "Post is currently unavailable. Please try again later.",
				timeout: 3000
			});
		} else {
			if (type == 'SubletListing'){
				$location.path('/sublets/' + uid + '/view');
			} else {
				$location.path('/listing/' + uid);
			}
		}
	};

})
