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
	imageUploadService, $window, fileReader) {
		var localStorageKey = 'listingform';
		var url = window.location.hash;
		$scope.userDataService = userDataService;
		$scope.imageUploadService = imageUploadService;
		$scope.type = url.split('#')[2];
		$scope.photos = [];
		var text;

		//
		//  $scope.uploadImages = function() {
		//    console.log($scope.fileinfos);
		//    $.each($scope.fileinfos, function(index, fileinfo){
		//      imageUploadService.uploadImage(fileinfo, $scope.doneUploadingOneImage);
		//    });
		//    $scope.isUploading = true;
		//  }
		//
		//  $scope.doneUploadingOneImage = function(imageUrl) {
		//    if (!imageUrl){
		//      SweetAlert.swal("Photo Upload Error", "Sorry Image Upload is temporarily unavailable.", "success");
		//    }
		//    var formattedUrl = imageUrl.split('?');
		//    console.log(formattedUrl);
		//    $scope.listing.photolinks.push(formattedUrl[0]);
		//    console.log($scope.listing.photolinks);
		//    if ($scope.listing.photolinks.length == $scope.images.length) {
		//      $scope.isUploading = false;
		//    }
		//  }
		//
		//  $scope.getFiles = function () {
		//    $.each($scope.files, function(index, file) {
		//      fileReader.readAsDataUrl(file, $scope)
		//          .then(function(result) {
		//              $scope.images.push(result);
		//              $scope.fileinfos.push(file);
		//          });
		//    });
		// };
		//
		// $scope.removeImage = function(index){
		//   $scope.images.splice(index,1);
		//   $scope.fileinfos.splice(index,1);
		// };

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
			$scope.newListingFormData = listingMap.getFieldsByType($scope.type);
			$scope.newListingFormData.type = listingMap.getListingTypeByType($scope.type);
			$scope.loadSavedData();
		};


		$scope.submit = function() {
			console.log('submitting');
			$scope.dataLoading = true;
			$scope.listing.type = $scope.type;
			listingDataService.newListing($scope.listing).then(
				function success(res){
					$scope.dataLoading = false;
					SweetAlert.swal("Congrats!", "Your post is now submitted for approval", "success");
					localStorageService.remove(localStorageKey);
				},
				function failure(res){
					$scope.dataLoading = false;
					if (res.status === -1) {
						SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
					} else {
						var errorMessage;
						if (!res.data && res.data.message && res.data.message.message) {
							errorMessage = res.data.message.message;
							SweetAlert.swal("I'm sorry I can't do that", errorMessage, "error");
						}
						else {
							SweetAlert.swal("I'm sorry I ran into a problem", "We're on it.", "error");
						}
					}
				});
			};

			$scope.loadSavedData = function() {
				$scope.listing = localStorageService.get(localStorageKey) || {};
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
