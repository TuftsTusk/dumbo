'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
    .controller('ViewCtrl', function ($scope, $http, $routeParams, listingDataService, $location, sellerContactService) {
    $scope.id = $routeParams.id;
    $scope.listing = {};
    $scope.listing.error = true;

    $scope.init = function () {
        listingDataService.getListingById($scope.id)
            .then(function (result) {
                $scope.listing.error = false;
                $scope.listing = result.data.listing;
                $scope.isOwner = result.data.owner;
                if (result.data.listing.photo_urls && result.data.listing.photo_urls.length > 0){
                    $scope.source = result.data.listing.photo_urls[0].photo_url;
                }
            }, function (result) {
                $scope.listing.error = true;
            })
    };

    $scope.contactSeller = sellerContactService.contactSeller;

    $scope.editListing = function(){
        $location.path('/listing/' + $scope.id + '/edit');
    }

    $scope.switch_source = function (array_place) {
        $scope.source = $scope.listing.photo_urls[array_place].photo_url;
    };


});
