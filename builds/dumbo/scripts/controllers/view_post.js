'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
    .controller('ViewCtrl', function ($scope, $http, $routeParams, listingDataService) {
        $scope.id = $routeParams.id;

//        $http.get('/listing/' + $scope.id).then(function (result) {
//            $scope.listing = result.data.listing;
//            $scope.isOwner = result.data.owner;
//            $scope.source = result.data.listing.photo_urls[0].photo_url;
//            console.log($scope.source);
//
//        });
        $scope.listing = {};
        $scope.listing.error = true;


        $scope.init = function () {
            listingDataService.getListingById($scope.id)
                .then(function (result) {
                    
                    $scope.listing.error = false;
                    $scope.listing = result.data.listing;
                    $scope.isOwner = result.data.owner;
                    $scope.source = result.data.listing.photo_urls[0].photo_url;
                    console.log($scope.source);
                }, function (result) {
                    $scope.listing.error = true;
                })

        }


        $scope.switch_source = function (array_place) {
            $scope.source = $scope.listing.photo_urls[array_place].photo_url;
        };


    });