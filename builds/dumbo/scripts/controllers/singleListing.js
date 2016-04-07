'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope, $routeParams, $location, listingDataService, localStorageService) {
	var id = $routeParams.id;
	var localStorageKey = 'subletListing';
	// $scope.currentPage = $routeParams.path;
	$scope.selected = 0;

	renderScreen('general');
	function renderScreen(screen) {
		// Hides other pages and shows the starting screen.
		$scope.currentPage = screen;
		$('.page').not($('#' + screen)).removeClass('visible');
		$('#' + screen).addClass('visible');
	}

	// data for entire sublet listing
	loadSavedData();

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

	$scope.saveApt = function() {
		// console.log($scope.listingData);
		// console.log(JSON.stringify($scope.listingData));
		console.log('saving');
		// listingDataService.newListing($scope.listingData);
	}

	$scope.setCurrentPage = function(screen) {
		updateSavedData();
		$scope.currentPage = screen;
		renderScreen(screen);
	}


	// $scope.setCurrentPage = function(index) {
	// 	var pages = [
	// 		'general',
	// 		'bedrooms',
	// 		'photos'
	// 	];
	// 	var str = $location.url();
	// 	updateSavedData();
	// 	$scope.currentPage = pages[index];
	// 	$location.path(str.substring(0, str.lastIndexOf("/")) + '/' + pages[index]);
	// }

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
				type: 'SubletListing',
				"apt_info":{
					"op_details":{

					}
				},
				"bedrooms":[
					{
						date_start: new Date('2016-05-23'),
						date_end: new Date('2016-08-23'),
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
						date_start: new Date('2016-05-14'),
						date_end: new Date('2016-09-10'),
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
						if (key == 'date_start' || key == 'date_end') {
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

		$scope.apt = $scope.listingData.apt_info;
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

		// $('#singleListing input').attr('ng-blur','saveApt()');
	}


	function debugLoadTestData() {
		var test_room = {
			date_start: new Date('2016-05-23'),
			date_end: new Date('2016-08-23'),
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
			date_start: new Date('2016-05-14'),
			date_end: new Date('2016-09-10'),
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
