'use strict';

angular.module('dumboApp')
.controller('editSubletCtrl', function ($scope, $routeParams, $location, listingDataService, SweetAlert, subletService, _, $timeout) {
	var id = $routeParams.id;
	var action = $routeParams.action;

	$scope.errorLog = {};
	$scope.warningLog = {};
	$scope.maxRooms = 10;

    $scope.validation = subletService.getValidationData();
    $scope.fieldMap = subletService.getFieldMap();

	$scope.init = function() {
		$scope.selectedRoom = 0;

		$scope.newListing = false;
		$scope.owner = false;

		// set min and max dates
		var dmin = new Date(),
			dmax = new Date();
		dmax.setFullYear(dmin.getFullYear() + 2);
		$scope.dateMin = dmin.toISOString().substring(0, 10);
		$scope.dateMax = dmax.toISOString().substring(0, 10);


        if (id) {
			// get listing data from server
			listingDataService.getListingById(id).then(
				function success(res){
					var data = subletService.prepareView(res.data);
					$scope.listingData = data.listingData;
					$scope.owner = data.owner;

					dataPrep();
				},
				function failure(res){
					console.log("ERROR");
					console.log('res',res);
				});


		} else {

			// New listing or editing a local listing

			// Check local storage for new listing data
				// If no saved data, get ID from server
				// Create DOM and save to local storage
			$scope.newListing = true;
			$scope.owner = true;
			loadSavedData();
		}

        renderScreen($location.hash());
	}

    $scope.$on('$locationChangeSuccess', function() {
        renderScreen($location.hash());
    })

	$scope.loadPreview = function() {
		if ($scope.listingValidation.alert) {
			$scope.showAlert = true;
		} else {
			$scope.redirectTo('preview');
		}
	}

	$scope.redirectTo = function(path) {
		var pathArr = $location.path().split('/');
        var url = pathArr[1] + '/' + path;
        if (id) url += '/' + id;
        $location.path(url);
	}

	$scope.save = function() {
		console.log(JSON.stringify($scope.listingData));
		console.log('saving');
		updateSavedData();
		validateData();
	}

	$scope.saveButton = function() {
		$scope.save();
		SweetAlert.swal("Saved!", "Feel free to come back to this later.", "success");
	}

    $scope.submitApt = function() {
		console.log($scope.listingData);
		listingDataService.newListing($scope.listingData)
		.then(
		function success(res){
		  $scope.dataLoading = false;
		  SweetAlert.swal("Congrats!", "Your post is now submitted for approval", "success");
		  subletService.removeLocalData();
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

	$scope.setCurrentPage = function(page) {
		updateSavedData();
        $location.hash(page);
	}

    $scope.loadRoom = function(index) {
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
		if (length < $scope.maxRooms) {
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
			$scope.save();
		} else {
			alert("You have too many rooms!");
		}
	}

	$scope.copyRoom = function() {
		var length = $scope.listingData.bedrooms.length;
		if (length < $scope.maxRooms) {
			var r = angular.copy($scope.room);
			r.title = r.title + ' copy';
			$scope.listingData.bedrooms.splice($scope.selectedRoom + 1, 0, r);
			$scope.save();
		} else {
			alert("You have too many rooms!");
		}
	}

	$scope.initializeRoom = function() {
		$scope.newRoom();
		$scope.loadRoom(0);
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
		var room = $scope.listingData.bedrooms[$scope.selectedRoom];
		console.log($scope.selectedRoom);
		var empty = true;
		console.log(room);
		$.each(room, function(key, value) {
			if (key != 'title' && key != 'photos' && key != '$$hashKey') {
				empty = false;
			} else if (key == 'photos' && !(_.isEmpty(value))) {
				empty = false;
			}
		});
		if (!empty) {
			$('#roomForm .panel').addClass('formBlur');
		} else {
			$scope.deleteRoom();
		}
	}
	$scope.cancelDelete = function() {
		$('#roomForm .panel').removeClass('formBlur');
	}

	$scope.deleteRoom = function() {
		$('#roomForm .panel').removeClass('formBlur');
		var index = $scope.selectedRoom;
		$scope.listingData.bedrooms.splice(index, 1);

		var length = $scope.listingData.bedrooms.length,
			newIndex = 0;
		newIndex = length <= index ? index - 1 : index;

		$scope.loadRoom(newIndex);
		$scope.save();
	}

	$scope.deleteRoomPhoto = function(index) {
		$scope.room.photos.splice(index, 1);
		$scope.save();
	}

	$scope.deleteCommonAreaPhoto = function(type, index) {
		$scope.listingData.common_area_photos[type].splice(index, 1);
	}

    $scope.modifyAllApt = function(bool) {
		if (typeof bool === 'boolean') {
			$.each($scope.fieldMap.apt_op_details, function(index, field) {
				$scope.apt.op_details[field.variable] = bool;
			});
		}
	}

    $scope.initiatePhotoUpload = function(type) {
		$('#photoUploadInput').click();
		$scope.currentUploadType = type;
		if (type == 'room') {
			$scope.currentUploadTarget = $scope.listingData.bedrooms[$scope.selectedRoom].photos;
		} else {
			$scope.currentUploadTarget = $scope.listingData.common_area_photos[type];
		}
	}

	function renderScreen(page) {
		// Hides other pages and shows the starting page.

        page = page && page != '' ? page : 'general';

		$scope.currentPage = page;
		$('.page').not($('#' + page)).removeClass('visible');
		$('#' + page).addClass('visible');
	}

    function loadSavedData() {
		var data = subletService.loadLocalData();
		$scope.listingData = data.form;
		$scope.viewData = data.view;

		dataPrep();
	}

    function deleteSavedData() {
		subletService.removeLocalData();
		var d = subletService.getEmptyData();
		$scope.listingData = d.form;
		$scope.viewData = d.view;
	}

    function updateSavedData() {
		var localStorageObject = {
			form: $scope.listingData,
			view: $scope.viewData
		}
		subletService.setLocalData(localStorageObject);
	};


    function validateData() {
		$scope.listingValidation = {
			alert: false,
			warning: ''
		};
		var tempListingData = angular.copy($scope.listingData);

		$scope.errorLog.apt_info = validateField('apt_info', tempListingData.apt_info, 'required');
		validateBedrooms(tempListingData, 'required');
		validateBedrooms(tempListingData, 'recommended');
		$scope.errorLog.common_area_photos = validateField('common_area_photos', tempListingData.common_area_photos, 'required');
		$scope.warningLog.common_area_photos = validateField('common_area_photos', tempListingData.common_area_photos, 'recommended');

		var err = $scope.errorLog;
		$scope.listingValidation.alert = (err.apt_info || err.bedrooms || err.common_area_photos) ? true : false;
		if (!$scope.listingValidation.alert) {
			$scope.showAlert = false;
		}
	}

    function validateBedrooms(tempListingData, fieldType) {
		var bedroomError = false;
		var logType = (fieldType == 'required') ? 'errorLog' : (fieldType == 'recommended') ? 'warningLog' : 'BAD';
		$scope[logType].bedrooms = [];
		$.each(tempListingData.bedrooms, function(index, room) {
			var roomValidation = validateField('room', room, fieldType);
			if (roomValidation != null) bedroomError = true;
			$scope[logType].bedrooms.push(roomValidation);
		});
		if (tempListingData.bedrooms.length == 0) {
			bedroomError = true;
			$scope[logType].bedrooms = true;
		}
		if (!bedroomError) $scope[logType].bedrooms = null;
	}

    function validateField(field, inputData, fieldType) {

		if (fieldType != 'required' && fieldType != 'recommended') {
			console.log('ERROR');
		}

		var data = angular.copy(inputData);

		var response = {};
		$.each($scope.validation[field], function(key,value) {

			// clean out undefined fields
			if (data[key] == undefined) {
				delete data[key];
			}
			if (!(key in data) || (Array.isArray(data[key]) && data[key].length == 0)) {

				if (value[fieldType]) {
					if (fieldType == 'required' || (fieldType == 'recommended' && !value['required'])) {
						response[key] = true;
					}
				}
			} else {
				delete response[key];

			}
			if (key in data) delete data[key];
		});

		if (!(_.isEmpty(data))) {
			// listingData not empty: data contains extraneous fields

			console.log('NOT EMPTY');
			console.log(data);
		}
		if (_.isEmpty(response)) {
			response = null;
		}

		return response;
	}

	$scope.closeAlert = function() {
		$scope.showAlert = false;
	}

    function dataPrep() {
		$scope.apt = $scope.listingData.apt_info;
		if ($scope.listingData.bedrooms.length > 0) {
			$scope.loadRoom(0);
		} else {
			$scope.initializeRoom();
		}
		validateData();
	}

});
