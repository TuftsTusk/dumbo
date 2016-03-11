'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope) {

	// title in header
	$scope.roomTitle = 'Room 1';
	$scope.selected = '';

	// data for entire sublet listing
	$scope.listingData = {
		address: '303 Boston Ave, Medford, MA',
		bedrooms: []
	}

	// remove this
	var test_room = {
		// dateAvailable: 'Mon May 23 2016 00:00:00 GMT-0400 (EDT)',
		// dateUnavailable: 'Tue Aug 23 2016 00:00:00 GMT-0400 (EDT)',
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
		// dateAvailable: 'Mon May 14 2016 00:00:00 GMT-0400 (EDT)',
		// dateUnavailable: 'Tue Sep 10 2016 00:00:00 GMT-0400 (EDT)',
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

	$scope.switch_room = function(room, index) {
		if ($scope.selected == '') {
			$scope.selected = index;
		}
		console.log($scope.room);
		$scope.load_room(index);
	}

	// when back button is pressed
	// $scope.save = function(room, prev_index) {
	// 	if (room) {
	// 		console.log(room);
	// 		console.log(prev_index);
	// 		var r = angular.copy(room);
	// 		$scope.listingData.bedrooms[prev_index] = r;
	// 		console.log('saving');
	// 		console.log($scope.listingData.bedrooms);
	// 	}
	// }

	$scope.load_room = function(index) {
		$scope.room = $scope.listingData.bedrooms[index];
		$scope.roomTitle = $scope.listingData.bedrooms[index].title;
		console.log($scope.listingData.bedrooms);
		$scope.selected = index;
	}

	// check if a field is empty
	// angular has functionality for simply checking if a field is empty,
	// but I wanted some extra things to happen when the title was modified.
	// The function is passed the value of the field it is supposed to modify,
	// so it can be used for multiple fields.
	$scope.checkEmpty = function(room, value) {
		if (value == 'title') {
			if (!room[value]) {
				// if the title field is empty, set the title to Room 1
				$scope.roomTitle = 'Room 1';
			} else {
				$scope.roomTitle = room[value];
			}
		}
	};

	// set min and max dates
	var dmin = new Date(),
		dmax = new Date();
	dmax.setFullYear(dmin.getFullYear() + 1);
	$scope.dateMin = dmin.toISOString().split('T')[0];
	$scope.dateMax = dmax.toISOString().split('T')[0];

});
