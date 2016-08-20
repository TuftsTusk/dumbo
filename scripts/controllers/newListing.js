'use strict';

/**
* @ngdoc function
* @name dumboApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the dumboApp
*/
angular.module('dumboApp')
.controller('NewListingCtrl', function ($scope, $http, listingMap,
																				listingDataService, SweetAlert,
																				localStorageService, _, userDataService,
																				imageUploadService, $window, fileReader,
																				$routeParams, $location, $route) {
		var localStorageKey = 'listingform';
		var url = window.location.hash;
		$scope.id = $routeParams.id;

		$scope.userDataService = userDataService;
		$scope.imageUploadService = imageUploadService;
		$scope.type = $route.current.$$route.listingType;
		$scope.photos = [];
		var text;

		$scope.initiatePhotoUpload = function() {
			$('#photoUploadInput').click();
			//probably don't need these checks, but for now
			//    if ($scope.listingData.bedrooms[$scope.selectedRoom] == undefined) {
			// 	   $scope.listingData.bedrooms[$scope.selectedRoom].photos = [];
			//    }
			$scope.currentUploadTarget = $scope.photos;


		}

		$scope.deletePhoto = function(index) {
			$scope.photos.splice(index, 1);
		}

		$scope.save = function() {
			console.log('saving');
			$scope.listing.photo_urls = $scope.photos;
			localStorageService.set(localStorageKey, $scope.listing);
		}

		$scope.init = function(){
			if ($scope.id){
				$scope.isLoading = true;
				listingDataService.getListingById($scope.id).then(
					function success(res){
						$scope.type = res.data.listing.type;
						$scope.isLoading = false;
						$scope.newListingFormData = listingMap.getFieldsByType(res.data.listing.type);
						$scope.newListingFormData.type = listingMap.getListingTypeByType($scope.type);
						$scope.listing = res.data.listing;
						if (res.data.listing.photo_urls){
							$scope.photos = res.data.listing.photo_urls;
						}

				}, function failure(){
						$scope.isLoading = false;
						SweetAlert.swal("Woops", "Please check the URL and try again.", "error");
						//TODO: REDIRECT somewhere?
				})
			} else{
				$scope.newListingFormData = listingMap.getFieldsByType($scope.type);
				$scope.newListingFormData.type = listingMap.getListingTypeByType($scope.type);
				$scope.loadSavedData();
			}
		};


		$scope.submit = function() {
			console.log('submitting');
			$scope.dataLoading = true;
			$scope.listing.type = $scope.type;
			if ($scope.id){
				listingDataService.editListing($scope.id, $scope.listing).then(
					function success(res){
						$scope.dataLoading = false;
						SweetAlert.swal("Congrats!", "Your changes are now submitted for approval", "success");
						$location.path('/');
					},
					function failure(res){
						$scope.dataLoading = false;
						if (res.status === -1) {
							SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
						} else {
							var errorMessage;
							if (res.data && res.data.message) {
								errorMessage = res.data.message;
								SweetAlert.swal("I'm sorry I can't do that", errorMessage, "error");
							}
							else {
								SweetAlert.swal("I'm sorry I ran into a problem", "We're on it.", "error");
							}
						}
					});

			} else {
				listingDataService.newListing($scope.listing).then(
					function success(res){
						$scope.dataLoading = false;
						SweetAlert.swal("Congrats!", "Your post is now submitted for approval", "success");
						localStorageService.remove(localStorageKey);
						$location.path('/');
					},
					function failure(res){
						$scope.dataLoading = false;
						if (res.status === -1) {
							SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
						} else {
							var errorMessage;
							if (res.data && res.data.message) {
								errorMessage = res.data.message;
								SweetAlert.swal("I'm sorry I can't do that", errorMessage, "error");
							}
							else {
								SweetAlert.swal("I'm sorry I ran into a problem", "We're on it.", "error");
							}
						}
					});
				};
			}


			$scope.loadSavedData = function() {
				$scope.listing = localStorageService.get(localStorageKey) || {};
				if ($scope.listing.photo_urls){
					$scope.photos = $scope.listing.photo_urls;
				}
			}

			$scope.deleteSavedData = function() {
				SweetAlert.swal({title: "Are you sure?",
				text: "You will not be able to recover this listing draft!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, start over!",
				closeOnConfirm: true },
				function(isConfirm){
					if (isConfirm){
						localStorageService.remove(localStorageKey);
						$scope.listing = {};
						$scope.photos = [];
					}
				});
			}
			$scope.isDataEmpty = function(){
				return _.isEmpty($scope.listing);
			}

		});
