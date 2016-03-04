'use strict';

angular.module('dumboApp')
.controller('UserListingsCtrl', function ($scope) {

	$scope.title = 'Room 1';
	$scope.listingData = {
		address: '303 Boston Ave, Medford, MA',
		rooms: [
			//   {
			// 	  placeholder: $scope.title,
			// 	  title: $scope.title,
			// 	  rent: '',
			// 	  dateAvailable: '',
			// 	  dateUnavailable: '',
			//   }
		]
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

		//   if (e.keyCode == 8 && $scope.listingData.rooms[0][value] == '') {
		// 	  e.preventDefault();
		// 	  console.log('empty');
		// 	  //$scope.model[value] = '';
		//   }
	};
	var dmin = new Date(),
		dmax = new Date();
	dmax.setFullYear(dmin.getFullYear() + 1);
	$scope.dateMin = dmin.toISOString().split('T')[0];
	// $scope.dateMin = d;
	$scope.dateMax = dmax.toISOString().split('T')[0];

	$scope.checkDate = function(e) {
		console.log('checkDate');
		var dateString1 = $scope.roomForm['dateAvailable'],
			dateString2 = $scope.roomForm['dateUnavailable'];
		console.log(dateString1);
		console.log(dateString2);

		if (dateString1 != "" && dateString2 != "") {

			console.log('check here');
			var d1 = new Date(dateString1),
				d2 = new Date(dateString2);

		}
	}

	console.log($scope.listingData);
});
