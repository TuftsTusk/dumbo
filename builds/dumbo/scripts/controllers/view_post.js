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
            $scope.listings = result.data;
            console.log(result.data);

        });





    });
