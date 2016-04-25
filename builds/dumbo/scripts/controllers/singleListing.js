'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope, $routeParams, $location, listingDataService, SweetAlert, localStorageService) {
	var id = $routeParams.id;
	var action = $routeParams.action;
	var localStorageKey = 'SubletListing';

	$scope.errorLog = {
		apt_info: {},
		bedrooms: [],
		common_area_photos: {
			living_room: [],
			kitchen: [],
			bathroom: [],
			other: []
		}
	};

	var emptyData = {
		view: {
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
			bedrooms: [],
			common_area_photos: {
				living_room: [],
				kitchen: [],
				bathroom: [],
				other: []
			}
		}
	};

	$scope.aptDetailsModel = [
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

	$scope.commonAreaPhotoFields = [
		{ name: 'Living Room',
		  variable: 'living_room'},

		{ name: 'Kitchen',
		  variable: 'kitchen'},

		{ name: 'Bathroom(s)',
		  variable: 'bathroom'},

		{ name: 'Other',
		  variable: 'other'}
	];

	$scope.aptDetailsChecklist = [];
	$.each($scope.aptDetailsModel, function(index) {
		$.each($scope.aptDetailsModel[index], function(key, value) {
			$scope.aptDetailsChecklist.push(value);
		})
	});

	$scope.init = function() {
		$scope.selectedRoom = 0;

		$scope.newListing = false;
		$scope.editing = false;
		$scope.owner = false;

		$scope.roomDetailsChecklist = {
			'Furnished': 'pre_furnished',
			'Air conditioning': 'incl_air_conditioning'
		}

		// set min and max dates
		var dmin = new Date(),
			dmax = new Date();
		dmax.setFullYear(dmin.getFullYear() + 2);
		$scope.dateMin = dmin.toISOString().substring(0, 10);
		$scope.dateMax = dmax.toISOString().substring(0, 10);


			// TODO: also retrieve listing if action is a UUID
		if (id) {
			if (action == 'edit' || action == 'view') {
				// get listing data from server
				listingDataService.getListingById(id).then(
					function success(res){
						console.log(res.data);
						prepareView(res.data);
					},
					function failure(res){
						console.log("ERROR");
						console.log('res',res);
					});
			} else {
				$scope.redirectTo('view');
			}

		} else if (action == 'new') {

			// New listing

			// Check local storage for new listing data
				// If no saved data, get ID from server
				// Create DOM and save to local storage
			$scope.newListing = true;
			$scope.editing = true;
			$scope.owner = true;
			loadSavedData();
		} else if (action == 'preview') {
			$scope.editing = false;
			$scope.owner = true;
		}
		else {
			// action is actually ID because there was no action
			id = action;
			$location.path($location.path().split('/')[1] + '/' + id + '/view');
		}

		renderScreen('general');
	}




	$scope.redirectTo = function(path) {
		var pathArr = $location.path().split('/');

		if (pathArr[2] === id) {
			$location.path(pathArr[1] + '/' + id + '/' + path);
		} else {
			if (path == 'edit') {
				path = 'new';
			}
			$location.path(pathArr[1] + '/' + path);
		}
	}

	$scope.save = function() {
		if ($scope.editing) {
			console.log($scope.listingData);
			console.log('saving');
			updateSavedData();
			updateErrorLog();
		}
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
		if ($scope.editing) {
			updateSavedData();
		}
		$scope.currentPage = screen;
		renderScreen(screen);
	}

	$scope.loadRoom = function(index) {
		console.log($scope.listingData);
		var length = $scope.listingData.bedrooms.length;
		if (index >= 0 && length > 0 && length > index) {
			$scope.selectedRoom = index;
		} else {
			$scope.selectedRoom = 0;
		}
		$scope.room = $scope.listingData.bedrooms[index];
	}

	$scope.newRoom = function() {
		var length = $scope.listingData.bedrooms.length;
		var newIndex = length;
		var r = {
			title: 'Room ' + (newIndex + 1),
			photos: []
		};
		$scope.listingData.bedrooms.push(r);
		length = $scope.listingData.bedrooms.length;

		if (length == 1) {
			$scope.loadRoom(0);
		}
	}

	$scope.saveRoom = function() {
		var index = $scope.selectedRoom;
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
		if ($scope.editing) {
			$('#roomForm .panel').addClass('formBlur');
		}
	}
	$scope.cancelDelete = function() {
		$('#roomForm .panel').removeClass('formBlur');
	}

	$scope.deleteRoom = function() {
		if ($scope.editing) {
			$('#roomForm .panel').removeClass('formBlur');
			var index = $scope.selectedRoom;
			$scope.listingData.bedrooms.splice(index, 1);

			var length = $scope.listingData.bedrooms.length,
				newIndex = 0;
			newIndex = length <= index ? index - 1 : index;

			$scope.loadRoom(newIndex);
		}

	}

	$scope.deleteRoomPhoto = function(index) {
		$scope.room.photos.splice(index, 1);
		$scope.save()
	}

	$scope.deleteCommonAreaPhoto = function(type, index) {
		$scope.listingData.common_area_photos[type].splice(index, 1);
	}

	$scope.modifyAllApt = function(bool) {
		if (typeof bool === 'boolean') {
			$.each($scope.aptDetailsChecklist, function(index, value) {
				$scope.apt.op_details[value] = bool;
			});
		}
	}

	$scope.initiatePhotoUpload = function(type) {
		$('#photoUploadInput').click();
		$scope.currentUploadType = type;
		if (type == 'room') {
			//probably don't need these checks, but for now
			if ($scope.listingData.bedrooms[$scope.selectedRoom] == undefined) {
				$scope.listingData.bedrooms[$scope.selectedRoom].photos = [];
			}
			$scope.currentUploadTarget = $scope.listingData.bedrooms[$scope.selectedRoom].photos;
		} else {
			$scope.currentUploadTarget = $scope.listingData.common_area_photos[type];
		}

	}


	function prepareView(data) {
		var listing = data.listing;
		var owner = data.owner;
		if (listing && listing.type == 'SubletListing') {
			// check owner
			$scope.listingData = {};
			$scope.listingData.apt_info = listing.apt_info;
			$scope.listingData.bedrooms = listing.bedrooms;
			$scope.listingData.common_area_photos = listing.common_area_photos;
			$scope.listingData.id = listing._id;
			$scope.listingData.type = 'SubletListing';

			$.each($scope.listingData.bedrooms, function(index) {
				$.each($scope.listingData.bedrooms[index], function(key, value) {
					if (key == 'date_start' || key == 'date_end') {
						// TODO: different format
						$scope.listingData.bedrooms[index][key] = new Date(value);
					}
				});
			});

			$scope.apt = $scope.listingData.apt_info;
			$scope.loadRoom(0);

			$scope.owner = owner;

			if (action == 'edit' && $scope.owner) {
				$scope.editing = true;
			} else if (action == 'view') {
				$scope.editing = false;
			}

			dataPrep();
		} else {
			// listing not found
		}
	}

	function renderScreen(screen) {
		// Hides other pages and shows the starting screen.
		$scope.currentPage = screen;
		$('.page').not($('#' + screen)).removeClass('visible');
		$('#' + screen).addClass('visible');
	}

	function loadSavedData() {
		var savedData = localStorageService.get(localStorageKey);
		if (savedData) {
			var form = savedData.form;
			var view = savedData.view;
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
			$scope.listingData = form;
			$scope.viewData = view;
		} else {
			$scope.listingData = emptyData.form;
			$scope.viewData = emptyData.view;
		}
		dataPrep();

	}

	function deleteSavedData() {
		localStorageService.remove(localStorageKey);
		$scope.listingData = emptyData;
	}

	function updateSavedData() {
		var localStorageObject = {
			form: $scope.listingData,
			view: $scope.viewData
		}
		localStorageService.set(localStorageKey, localStorageObject);
	};

	function updateErrorLog() {
		if ($scope.rForm.$invalid) {
			var roomName = $scope.rForm.title.$modelValue;
			var errors = [];
			$.each($scope.rForm.$error, function(index, value) {
				errors.push(value[0].$name);
			})
			console.log($scope.errorLog.bedrooms);
		}
		if ($scope.aptForm.$invalid) {
			$.each($scope.aptForm.$error.required, function(index, value) {
				// $scope.errorLog.apt_info[]
			})
		}
	}

	function dataPrep() {
		$scope.apt = $scope.listingData.apt_info;
		if ($scope.listingData.bedrooms.length > 0) {
			$scope.loadRoom(0);
		}
	}



});
