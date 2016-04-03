'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope, $routeParams, $location, listingDataService, localStorageService) {
	var id = $routeParams.id;
	var localStorageKey = 'subletListing';
	$scope.currentPage = $routeParams.path;
	$scope.selected = 0;

	// data for entire sublet listing
	loadSavedData();

	$scope.apptDetailsChecklist = [
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
			apptInfo: {
				opDetails: {}
			},
			bedrooms: []
		}
	};

	$scope.saveAppt = function() {
		console.log($scope.listingData);
		listingDataService.newListing($scope.listingData);
	}


	$scope.setCurrentPage = function(index) {
		var pages = [
			'general',
			'bedrooms',
			'photos'
		];
		var str = $location.url();
		updateSavedData();
		$scope.currentPage = pages[index];
		$location.path(str.substring(0, str.lastIndexOf("/")) + '/' + pages[index]);
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

	function loadSavedData() {
		var debugTestData = {
			model: {
				general: {
					open: false
				},
				bedrooms: {
					open: false
				}
			},
			form: {
				"id":"1",
				"apptInfo":{
					"opDetails":{

					}
				},
				"bedrooms":[
					{
						dateAvailable: new Date('2016-05-23'),
						dateUnavailable: new Date('2016-08-23'),
						"rent":667,
						"title":"Jackson's room",
						"photos":[
							"http://www.pawderosa.com/images/puppies.jpg",
							"http://www.pamperedpetz.net/wp-content/uploads/2015/09/Puppy1.jpg",
							"http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg",
							"https://pbs.twimg.com/profile_images/497043545505947648/ESngUXG0.jpeg"
						]
					},
					{
						dateAvailable: new Date('2016-05-14'),
						dateUnavailable: new Date('2016-09-10'),
						"rent":750,
						"title":"Conor's room",
						"photos":[
							"http://www.fndvisions.org/img/cutecat.jpg",
							"https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg",
							"http://www.findcatnames.com/wp-content/uploads/2014/09/453768-cats-cute.jpg",
							"https://www.screensaversplanet.com/img/screenshots/screensavers/large/cute-cats-1.png"
						]
					}
				]
			}
		};

		var savedData = localStorageService.get(localStorageKey);
		if (savedData) {
			var form = savedData.form;
			var model = savedData.model;
			if (form) {
				$.each(form.bedrooms, function(index) {
					$.each(form.bedrooms[index], function(key, value) {
						if (key == 'dateAvailable' || key == 'dateUnavailable') {
							// TODO: different format
							form.bedrooms[index][key] = new Date(value);
						}
					});
				});
			}
			$scope.listingData = form;
			$scope.modelData = model;
		} else {
			$scope.listingData = debugTestData.form;
			$scope.modelData = debugTestData.model;
		}

	}

	function deleteSavedData() {
		localStorageService.remove(localStorageKey);
		$scope.listingData = emptyData;
	}

	function updateSavedData() {
		var lsObject = {
			form: $scope.listingData,
			model: $scope.modelData
		}
		localStorageService.set(localStorageKey, lsObject);
	};

	main();

	function main() {

		$scope.appt = $scope.listingData.apptInfo;
		$scope.roomDetailsChecklist = {
			'Furnished': 'pre_furnished',
			'Air conditioning': 'incl_air_conditioning'
		}


		if ($scope.listingData.bedrooms.length > 0) {
			$scope.loadRoom(0);
		}

		// set min and max dates
		var dmin = new Date(),
			dmax = new Date();
		dmax.setFullYear(dmin.getFullYear() + 1);
		$scope.dateMin = dmin.toISOString().substring(0, 10);
		$scope.dateMax = dmax.toISOString().substring(0, 10);


	}


	function debugLoadTestData() {
		var test_room = {
			dateAvailable: new Date('2016-05-23'),
			dateUnavailable: new Date('2016-08-23'),
			rent: 667,
			title: "Jackson's room",
			photos: [
				'http://www.pawderosa.com/images/puppies.jpg',
				'http://www.pamperedpetz.net/wp-content/uploads/2015/09/Puppy1.jpg',
				'http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg',
				'https://pbs.twimg.com/profile_images/497043545505947648/ESngUXG0.jpeg'
			]
		};

		var test_room2 = {
			dateAvailable: new Date('2016-05-14'),
			dateUnavailable: new Date('2016-09-10'),
			rent: 750,
			title: "Conor's room",
			photos: [
				'http://www.fndvisions.org/img/cutecat.jpg',
				'https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg',
				'http://www.findcatnames.com/wp-content/uploads/2014/09/453768-cats-cute.jpg',
				'https://www.screensaversplanet.com/img/screenshots/screensavers/large/cute-cats-1.png'
			]
		}
		$scope.listingData.bedrooms.push(test_room);
		$scope.listingData.bedrooms.push(test_room2);
	}

});
