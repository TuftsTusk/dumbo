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


	  console.log($scope.listingData);
  });
