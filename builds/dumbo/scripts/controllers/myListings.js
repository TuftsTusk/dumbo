angular.module('dumboApp')
.controller('MyListingsCtrl', function ($scope, listingDataService, localStorageService) {
	$scope.drafts = [];
	var localStorageKeys = [
		'SubletListing'
	];
	listingDataService.getMeListing().then(
		function success(res) {
			$scope.listings = res.data;

			console.log(res.data);
		},
		function failure(res) {
			console.log('fail');
		}
	);

	$.each(localStorageKeys, function(index, lsKey) {
		var savedData = localStorageService.get(lsKey);
		if (savedData) {
			$scope.drafts.push(savedData.form);
		}
	});
	console.log($scope.drafts);
});
