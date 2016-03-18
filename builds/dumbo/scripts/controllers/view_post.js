'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
    .controller('ViewCtrl', function ($scope, $http) {
        console.log('ViewCtrl');
        $http.get('../../get_listing.json').then(function (result) {
            $scope.listings = result.data[0];
            $scope.source = result.data[0].image_gallery_link[0];
            console.log(result.data);

        });


    $scope.switch_source= function(array_place){
        $scope.source = $scope.listings.image_gallery_link[array_place];
    };


    });
