'use strict';

angular.module('dumboApp')
.controller('singleListingCtrl', function ($scope) {

	// title in header
	$scope.roomTitle = 'Room 1';

	// data for entire sublet listing
	$scope.listingData = {
		address: '303 Boston Ave, Medford, MA',
		bedrooms: []
	}

	// remove this
	var test_room = {
		dateAvailable: 'Mon May 23 2016 00:00:00 GMT-0400 (EDT)',
		dateUnavailable: 'Tue Aug 23 2016 00:00:00 GMT-0400 (EDT)',
		rent: 667,
		title: "Jackson's room",
		photos: [
			'http://www.pawderosa.com/images/puppies.jpg',
			'http://www.pamperedpetz.net/wp-content/uploads/2015/09/Puppy1.jpg',
			'http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg',
			'https://pbs.twimg.com/profile_images/497043545505947648/ESngUXG0.jpeg'
		]
	};
	$scope.listingData.bedrooms.push(test_room);

	// when back button is pressed
	$scope.save = function(room) {
		var r = angular.copy(room);
		$scope.listingData.bedrooms.push(r);
		console.log('saving');
		console.log($scope.listingData.bedrooms);
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
