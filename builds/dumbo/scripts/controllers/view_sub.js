'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
    .controller('SubCtrl', function ($scope, $http) {
        console.log('SubCtrl');
        $http.get('../../get_listing.json').then(function (result) {
            $scope.listings = result.data;
            $scope.source = result.data.image_gallery_link[0];
            console.log(result.data);

        });


    $scope.switch_source= function(array_place){
        $scope.source = $scope.listings.image_gallery_link[array_place];
    };


    });
