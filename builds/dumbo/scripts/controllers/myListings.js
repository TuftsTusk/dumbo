angular.module('dumboApp')
  	.controller('MyListingsCtrl', function ($scope, listingDataService) {
		listingDataService.getMeListing().then(
		function success(res) {
			$scope.listings = res.data;

			console.log(res.data);
		},
		function failure(res) {
			console.log('fail');
		});
  	});
