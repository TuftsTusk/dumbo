'use strict';

angular.module('dumboApp')
	.controller('multiLayout', function ($scope, listingDataService) {
        $scope.listings = {};
        $scope.listings.error = true;

        $scope.init = function(){
            listingDataService.getListings()
            .then(function success(request){
                console.log(request.data);
                $scope.listings = request.data;
                $scope.listings.error = false;

                console.log($scope.listings);
            }, function failure(request){
                $scope.listings.error = true;
            })
        }

	})
    .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
