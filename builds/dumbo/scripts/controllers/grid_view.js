'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */





angular.module('dumboApp')
    .controller('GridCtrl', function ($scope, $http, listingDataService, $routeParams) {
        console.log('GridCtrl');

        $scope.listings = {};
        $scope.listings.error = true;
        $scope.init = function () {
            listingDataService.getListings()
                .then(function success(request) {

                    $scope.listings = request.data;
                    $scope.listings.error = false;

                }, function failure(request) {
                    $scope.listings.error = true;
                })
        }

    })
    .controller('BookCtrl', function ($scope, $http, listingDataService) {
        console.log('BookCtrl');
        $scope.listings = {};
        $scope.listings.error = true;
        $scope.init = function () {
            listingDataService.getListingsByType('BookListing')
                .then(function success(request) {
                    console.log("Book Request Success!");
                    $scope.listings = request.data;
                    $scope.listings.error = false;

                }, function failure(request) {
                    console.log("Book Request Failure")
                    $scope.listings.error = true;
                })
        }

    })
    .controller('MiscCtrl', function ($scope, $http, listingDataService) {
        console.log('MiscCtrl');
        $scope.listings = {};
        $scope.listings.error = true;
        $scope.init = function () {
            listingDataService.getListingsByType('MiscListing')
                .then(function success(request) {
                    console.log("Misc Request Success!");
                    $scope.listings = request.data;
                    $scope.listings.error = false;


                }, function failure(request) {
                    $scope.listings.error = true;
                    console.log("Misc Request Failure");
                })
        }

    });