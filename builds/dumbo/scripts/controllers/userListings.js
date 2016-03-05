'use strict';

angular.module('dumboApp')
.controller('UserListingsCtrl', function ($scope) {

	$scope.title = 'Room 1';
	$scope.listingData = {
		address: '303 Boston Ave, Medford, MA',
		bedrooms: []
	}

	$scope.roomForm = {
		placeholder: $scope.title,
		title: $scope.title,
		rent: '',
		dateAvailable: '',
		dateUnavailable: '',
		DAFlexible: false,
		DUFlexible: false
	};

	$scope.save = function(room) {
		var r = angular.copy(room);
		$scope.listingData.bedrooms.push(r);
		console.log('saving');
		console.log($scope.listingData.bedrooms);
	}

	$scope.checkEmpty = function(e, value) {
		//console.log(e, value);
		//console.log($scope.roomForm[value]);

		if (value == 'title') {
			if ($scope.roomForm[value] == '') {
				$scope.title = 'Room 1';
			} else {
				$scope.title = $scope.roomForm[value];
			}
		}
	};
	var dmin = new Date(),
		dmax = new Date();
	dmax.setFullYear(dmin.getFullYear() + 1);
	$scope.dateMin = dmin.toISOString().split('T')[0];
	// $scope.dateMin = d;
	$scope.dateMax = dmax.toISOString().split('T')[0];

	var tForm = $('.tForm');
	// var inputs = tForm.find('.formInput');

	// $scope.DAValid = true;
	// $scope.DUValid = true;
	$scope.checkDate = function(room) {
		// console.log(room);
		// var dateString1 = room.dateAvailable,
		// 	dateString2 = room.dateUnavailable;
		// console.log(dateString1);
		// console.log(dateString2);
		// // $('.tForm .formInput.ng-invalid.ng-touched').parent().addClass('fieldInvalid');
		//
		// if (dateString1 && dateString2 && dateString1 != "" && dateString2 != "") {
		//
		// 	console.log('check here');
		// 	// var d1 = new Date(dateString1),
		// 	// 	d2 = new Date(dateString2);
		// }
	}

	console.log($scope.listingData);
});
