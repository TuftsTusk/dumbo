'use strict';

/**
* @ngdoc function
* @name dumboApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the dumboApp
*/





angular.module('dumboApp')
.controller('GridCtrl', function ($scope, $http, listingDataService) {
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

});
