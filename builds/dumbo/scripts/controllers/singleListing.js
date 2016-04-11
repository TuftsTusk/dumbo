'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope, $routeParams, $location, listingDataService, SweetAlert, localStorageService) {
	var id = $routeParams.id;
	var action = $routeParams.action;
	var localStorageKey = 'subletListing';
	// $scope.currentPage = $routeParams.path;
	$scope.selected = 0;

	$scope.newListing = false;
	$scope.editing = false;
	$scope.owner = false;

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



	if (!id && action == 'new') {
		// New listing

		// Check local storage for new listing data
			// If no saved data, get ID from server
			// Create DOM and save to local storage
		$scope.newListing = true;
		$scope.editing = true;
		// $('#singleListing input').prop( "disabled", false );

		$scope.owner = true;
		loadSavedData();

	} else if (id) {
		// get listing data from server
		listingDataService.getListingById(id).then(
			function success(res){
				prepareView(res.data);
			},
			function failure(res){
				console.log("ERROR");
				console.log('res',res);
			});
	}

	// function loadSavedData() {
	//
	// 	var savedData = localStorageService.get(localStorageKey);
	// 	if (savedData) {
	// 		var form = savedData.form;
	// 		var model = savedData.model;
	// 		if (form) {
	// 			$.each(form.bedrooms, function(index) {
	// 				$.each(form.bedrooms[index], function(key, value) {
	// 					if (key == 'date_start' || key == 'date_end') {
	// 						// TODO: different format
	// 						form.bedrooms[index][key] = new Date(value);
	// 					}
	// 				});
	// 			});
	// 		}
	// 		console.log(form);
	// 		$scope.listingData = form;
	// 		$scope.modelData = model;
	// 	} else {
	// 		// $scope.listingData = debugTestData.form;
	// 		// $scope.modelData = debugTestData.model;
	// 		$scope.listingData = emptyData.form;
	// 		$scope.modelData = emptyData.model;
	// 	}
	//
	// }





	function prepareView(data) {
		var listing = data.listing;
		var owner = data.owner;
		if (listing && listing.kind == 'SubletListing') {
			// check owner

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

			console.log(listing);
			console.log($scope.listingData);
			$scope.owner = owner;

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






	// data for entire sublet listing
	loadSavedData();




	renderScreen('general');
	function renderScreen(screen) {
		// Hides other pages and shows the starting screen.
		$scope.currentPage = screen;
		$('.page').not($('#' + screen)).removeClass('visible');
		$('#' + screen).addClass('visible');
	}

	$scope.redirectTo = function(path) {
		console.log($location.path().split('/'));
		var pathArr = $location.path().split('/');
		$location.path(pathArr[1] + '/' + pathArr[2] + '/' + path);
	}

	$scope.saveApt = function() {
		if ($scope.editing) {
			console.log($scope.listingData);
			// console.log(JSON.stringify($scope.listingData));
			console.log('saving');
			updateSavedData();
			// listingDataService.newListing($scope.listingData);
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
		// var debugTestData = {
		// 	model: {
		// 		general: {
		// 			open: false
		// 		},
		// 		bedrooms: {
		// 			open: false
		// 		}
		// 	},
		// 	form: {
		// 		"id":"1",
		// 		type: 'SubletListing',
		// 		"apt_info":{
		// 			"op_details":{
		//
		// 			}
		// 		},
		// 		"bedrooms":[
		// 			{
		// 				date_start: new Date('2016-05-23'),
		// 				date_end: new Date('2016-08-23'),
		// 				"rent":667,
		// 				"title":"Jackson's room",
		// 				"photos":[
		// 					{photo_url: "http://www.pawderosa.com/images/puppies.jpg"},
		// 					{photo_url: "http://www.pamperedpetz.net/wp-content/uploads/2015/09/Puppy1.jpg"},
		// 					{photo_url: "http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg"},
		// 					{photo_url: "https://pbs.twimg.com/profile_images/497043545505947648/ESngUXG0.jpeg"}
		// 				]
		// 			},
		// 			{
		// 				date_start: new Date('2016-05-14'),
		// 				date_end: new Date('2016-09-10'),
		// 				"rent":750,
		// 				"title":"Conor's room",
		// 				"photos":[
		// 					{photo_url: "http://www.fndvisions.org/img/cutecat.jpg"},
		// 					{photo_url: "https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg"},
		// 					{photo_url: "http://www.findcatnames.com/wp-content/uploads/2014/09/453768-cats-cute.jpg"},
		// 					{photo_url: "https://www.screensaversplanet.com/img/screenshots/screensavers/large/cute-cats-1.png"}
		// 				]
		// 			}
		// 		]
		// 	}
		// };

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
			// $scope.listingData = debugTestData.form;
			// $scope.modelData = debugTestData.model;
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
		$scope.listingData.common_area_photos = {};
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
		dmax.setFullYear(dmin.getFullYear() + 2);
		$scope.dateMin = dmin.toISOString().substring(0, 10);
		$scope.dateMax = dmax.toISOString().substring(0, 10);
	}


	// remove this
	$scope.testingImages = {};
	$scope.testingUploaded = {
		'room1': false
	};

	$scope.generatePics = function(type) {
		$('#photoUploadInput').click();
		if (type == 'room1') {
			$scope.listingData.bedrooms[0].photos = testingPhotos(type);
		} else if (type == 'room2') {
			$scope.listingData.bedrooms[1].photos = testingPhotos(type);
		} else {
			$scope.listingData.common_area_photos[type] = testingPhotos(type);
		}
		$scope.testingImages[type] = testingPhotos(type);
		$scope.testingUploaded[type] = true;
	}


	function testingPhotos(type) {
		var photos = {
			'room1': [
				'http://www.core6athletes.com/wp-content/uploads/2015/10/college-decorating-ideas-apartment.jpg',
				'http://blog.mindbites.com/wp-content/uploads/desk.jpg',
				'https://s-media-cache-ak0.pinimg.com/236x/65/f2/33/65f2334ce0bf00dd918c5b95b65d5032.jpg'
			],
			'room2': [
				'http://homeset.win/wp-content/uploads/2016/02/college-apartment-design-ideas.jpg',
				'http://avenueb.org/oldalbums/guestroom/aah.sized.jpg'
			],
			'living_room': [
				'http://static1.squarespace.com/static/524974d9e4b0faa97477b730/52e286ade4b09c7bb22af552/531dd09fe4b00379baf38b45/1394463699827/CS1.jpg',
				'http://www.ccifs.co/uploads/images/college-apartment-bedroom-decorating-ideas-unique-decoration-3-HVA2a.jpg'
			],
			'kitchen': [
				'http://www.lenwoodinc.com/wp-content/uploads/2015/01/LenwoodInc_CollegePark_Kitchen2.jpg',
				'https://medialibrarycdn.entrata.com/media_library/2422/518d10f6f3cc1186.jpg'
			],
			'bathroom': [
				'http://www.calicopot.com/wp-content/uploads/2016/03/college-apartment-ideas-on-magnificent-apartment-bathroom-ideas-on-bathroom-with-college-apartment-bathroom-decorating-ideas-plan.jpg'
			],
			'other': [

			]
		};
		var arr = PhotoArrayToObj(photos[type]);
		return arr;
	}

	function PhotoArrayToObj(arr) {
		var newArr = [];
		$.each(arr, function(index, value) {
			newArr.push({'photo_url': value});
		});
		return newArr;
	}

	// function debugLoadTestData() {
	// 	var test_room = {
	// 		date_start: new Date('2016-05-23'),
	// 		date_end: new Date('2016-08-23'),
	// 		rent: 667,
	// 		title: "Jackson's room",
	// 		photos: [
	// 			'http://www.pawderosa.com/images/puppies.jpg',
	// 			'http://www.pamperedpetz.net/wp-content/uploads/2015/09/Puppy1.jpg',
	// 			'http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg',
	// 			'https://pbs.twimg.com/profile_images/497043545505947648/ESngUXG0.jpeg'
	// 		]
	// 	};
	//
	// 	var test_room2 = {
	// 		date_start: new Date('2016-05-14'),
	// 		date_end: new Date('2016-09-10'),
	// 		rent: 750,
	// 		title: "Conor's room",
	// 		photos: [
	// 			'http://www.fndvisions.org/img/cutecat.jpg',
	// 			'https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg',
	// 			'http://www.findcatnames.com/wp-content/uploads/2014/09/453768-cats-cute.jpg',
	// 			'https://www.screensaversplanet.com/img/screenshots/screensavers/large/cute-cats-1.png'
	// 		]
	// 	}
	// 	$scope.listingData.bedrooms.push(test_room);
	// 	$scope.listingData.bedrooms.push(test_room2);
	// }

});
