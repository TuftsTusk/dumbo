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
