'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope, $routeParams, $location, listingDataService, SweetAlert, localStorageService, imageUploadService) {
	var id = $routeParams.id;
	var action = $routeParams.action;
	var localStorageKey = 'subletListing';
	// $scope.currentPage = $routeParams.path;
	$scope.selected = 0;

	$scope.newListing = false;
	$scope.editing = false;
	$scope.owner = false;

	if (!id && action == 'new') {
		// New listing

		// Check local storage for new listing data
			// If no saved data, get ID from server
			// Create DOM and save to local storage
		$scope.newListing = true;
		$scope.editing = true;
		// $('#singleListing input').prop( "disabled", false );

		$scope.owner = true;
	} else if (id) {
		// get listing data from server
		var listing = listingDataService.getListingById(id);
		if (listing && listing.type == 'SubletListing') {
			// check owner

			// $scope.listingData = listing;
			$scope.owner = listing.owner;

			if (action == 'edit' && $scope.owner) {
				$scope.editing = true;
			} else if (action == 'view') {
				$scope.editing = false;
			} else {
				$scope.editing = false;
				$scope.redirectTo('view');
			}
		} else {
			// listing not found
		}

	}

	renderScreen('general');
	function renderScreen(screen) {
		// Hides other pages and shows the starting screen.
		$scope.currentPage = screen;
		$('.page').not($('#' + screen)).removeClass('visible');
		$('#' + screen).addClass('visible');
	}



	$scope.aptDetailsModelRender = [
		{
			'Furnished': 'pre_furnished',
			'Air conditioning': 'incl_air_conditioning',
			'Washing machine': 'incl_washing_machine',
			'Dryer': 'incl_dryer',
			'Dishwasher': 'incl_dishwasher',
		},
		{
			'Pets allowed': 'pets_permitted',
			'Parking': 'on_premises_parking',
			'Handicap accessible': 'handicap_accessible',
			'Smoking permitted': 'smoking_permitted'
		}
	];
	$scope.aptDetailsChecklist = [];
	$.each($scope.aptDetailsModelRender, function(index) {
		$.each($scope.aptDetailsModelRender[index], function(key, value) {
			$scope.aptDetailsChecklist.push(value);
		})
	});
	// console.log('aptDetailsChecklist', $scope.aptDetailsChecklist);

	var emptyData = {
		model: {
			general: {
				open: false
			},
			bedrooms: {
				open: false
			}
		},
		form: {
			id: id,
			type: 'SubletListing',
			apt_info: {
				op_details: {}
			},
			bedrooms: []
		}
	};

	// data for entire sublet listing
	loadSavedData();

	$scope.redirectTo = function(path) {
		console.log($location.path().split('/'));
		var pathArr = $location.path().split('/');
		$location.path(pathArr[1] + '/' + pathArr[2] + '/' + path);
	}

	$scope.saveApt = function() {
		console.log($scope.listingData);
		// console.log(JSON.stringify($scope.listingData));
		console.log('saving');
		updateSavedData();
		// listingDataService.newListing($scope.listingData);
	}

	$scope.submitApt = function() {
		console.log($scope.listingData);
		listingDataService.newListing($scope.listingData)
		.then(
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
          }
        });
	}

	$scope.setCurrentPage = function(screen) {
		updateSavedData();
		$scope.currentPage = screen;
		renderScreen(screen);
	}

	$scope.loadRoom = function(index) {
		var length = $scope.listingData.bedrooms.length;
		if (index >= 0 && length > 0 && length > index) {
			$scope.room = $scope.listingData.bedrooms[index];
			$scope.selected = index;
		} else {
			$scope.room = {};
			$scope.selected = 0;
		}
	}

	$scope.newRoom = function() {
		var length = $scope.listingData.bedrooms.length;
		var newIndex = length + 1;
		var r = {title: 'Room ' + newIndex};
		$scope.listingData.bedrooms.push(r);

		length = $scope.listingData.bedrooms.length;
		if (length == 1) {
			$scope.loadRoom(0);
		}
	}

	$scope.saveRoom = function() {
		var index = $scope.selected;
		if (!$scope.room.title) {
			$scope.room.title = 'Room ' + (index + 1);
		}
	}

	$scope.switchRoom = function(room, newIndex) {
		// save the current room
		$scope.saveRoom();
		$scope.loadRoom(newIndex);
	}

	$scope.confirmDelete = function() {
		$('#roomForm .panel').addClass('formBlur');
	}
	$scope.cancelDelete = function() {
		$('#roomForm .panel').removeClass('formBlur');
	}

	$scope.deleteRoom = function() {
		$('#roomForm .panel').removeClass('formBlur');
		var index = $scope.selected;
		$scope.listingData.bedrooms.splice(index, 1);

		var length = $scope.listingData.bedrooms.length,
			newIndex = 0;
		if (length <= index) {
			newIndex = index - 1;
		} else {
			newIndex = index;
		}

		$scope.loadRoom(newIndex);
	}

	$scope.modifyAllApt = function(bool) {
		if (typeof bool === 'boolean') {
			$.each($scope.aptDetailsChecklist, function(index, value) {
				$scope.apt.op_details[value] = bool;
			});
		}
	}

	$scope.uploadImages = function() {
		console.log($scope.fileinfos);
		$.each($scope.fileinfos, function(index, fileinfo){
			imageUploadService.uploadImage(fileinfo, $scope.doneUploadingOneImage);
		});
		$scope.isUploading = true;
	}

	$scope.doneUploadingOneImage = function(imageUrl) {
		if (!imageUrl){
			SweetAlert.swal("Photo Upload Error", "Sorry Image Upload is temporarily unavailable.", "success");
		}
		var formattedUrl = imageUrl.split('?');
		console.log(formattedUrl);
		$scope.listingData.common_area_photos.kitchen.push(formattedUrl[0]);
		console.log($scope.listing.photolinks);
		if ($scope.listing.photolinks.length == $scope.images.length) {
			$scope.isUploading = false;
		}
	}

	$scope.getFiles = function () {
		$.each($scope.files, function(index, file) {
			fileReader.readAsDataUrl(file, $scope)
					.then(function(result) {
							$scope.images.push(result);
							$scope.fileinfos.push(file);
					});
		});
 };

 $scope.removeImage = function(index){
	 $scope.images.splice(index,1);
	 $scope.fileinfos.splice(index,1);
 };


	function loadSavedData() {
		var savedData = localStorageService.get(localStorageKey);
		if (savedData) {
			var form = savedData.form;
			var model = savedData.model;
			if (form) {
				$.each(form.bedrooms, function(index) {
					$.each(form.bedrooms[index], function(key, value) {
						if (key == 'date_start' || key == 'date_end') {
							// TODO: different format
							form.bedrooms[index][key] = new Date(value);
						}
					});
				});
			}
			console.log(form);
			$scope.listingData = form;
			$scope.modelData = model;
		} else {
			$scope.listingData = emptyData.form;
			$scope.modelData = emptyData.model;
		}

	}

	function deleteSavedData() {
		localStorageService.remove(localStorageKey);
		$scope.listingData = emptyData;
	}

	function updateSavedData() {
		var localStorageObject = {
			form: $scope.listingData,
			model: $scope.modelData
		}
		localStorageService.set(localStorageKey, localStorageObject);
	};

	main();

	function main() {

		$scope.apt = $scope.listingData.apt_info;
		$scope.roomDetailsChecklist = {
			'Furnished': 'pre_furnished',
			'Air conditioning': 'incl_air_conditioning'
		}

		if ($scope.listingData.bedrooms.length > 0) {
			$scope.loadRoom(0);
		}

		$scope.imageUploadService = imageUploadService;

		$scope.listingData.common_area_photos = {};
		$scope.listingData.common_area_photos.kitchen = [];
		$scope.listingData.common_area_photos.living_room = [];
		$scope.listingData.common_area_photos.bathroom = [];
		$scope.listingData.common_area_photos.other = [];

		// set min and max dates
		var dmin = new Date(),
			dmax = new Date();
		dmax.setFullYear(dmin.getFullYear() + 1);
		$scope.dateMin = dmin.toISOString().substring(0, 10);
		$scope.dateMax = dmax.toISOString().substring(0, 10);
	}
});
