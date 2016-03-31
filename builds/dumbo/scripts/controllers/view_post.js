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
        console.log($scope.id);
        console.log('ViewCtrl');
        $http.get('../../get_listing.json').then(function (result) {
            $scope.listings = result.data[0];
            $scope.source = result.data[0].image_gallery_link[0];
            console.log(result.data);

        });
        $scope.listing = {};
        $scope.listing.error = true;


    $scope.init = function() {
      listingDataService.getListingById($scope.id)
      .then(function(response){
        $scope.listing = response.data.listing;
        $scope.listing.error = false;
      }, function (response){
        console.log("ERROR");
        $scope.listing.error = true;
      })

    }


    $scope.switch_source= function(array_place){
        $scope.source = $scope.listings.image_gallery_link[array_place];
    };


    });
