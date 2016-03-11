'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope) {

	// title in header
	$scope.roomTitle = 'Room 1';
	$scope.selected = 0;

	// data for entire sublet listing
	$scope.listingData = {
		address: '303 Boston Ave, Medford, MA',
		bedrooms: []
	}

	// remove this
	debugLoadTestData();

	$scope.loadRoom = function(index) {
		$scope.room = $scope.listingData.bedrooms[index];
		$scope.roomTitle = $scope.listingData.bedrooms[index].title;
		debugPrintListingData();
		$scope.selected = index;
	}

	$scope.newRoom = function() {
		var newIndex = $scope.listingData.bedrooms.length + 1;
		var r = {title: 'Room ' + newIndex};
		$scope.listingData.bedrooms.push(r);

		debugPrintListingData();
	}

	$scope.switchRoom = function(room, index) {
		if ($scope.selected == '') {
			$scope.selected = index;
		}
		// console.log($scope.room);
		$scope.loadRoom(index);
	}

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

	if ($scope.listingData.bedrooms.length > 0) {
		$scope.loadRoom(0);
	}

	// set min and max dates
	var dmin = new Date(),
		dmax = new Date();
	dmax.setFullYear(dmin.getFullYear() + 1);
	$scope.dateMin = dmin.toISOString().split('T')[0];
	$scope.dateMax = dmax.toISOString().split('T')[0];

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




	function debugLoadTestData() {
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
	}

	function debugPrintListingData() {
		for (var i = 0; i < $scope.listingData.bedrooms.length; i++) {
			console.log(i + '.');
			console.log($scope.listingData.bedrooms[i]);
		}
	}
});
