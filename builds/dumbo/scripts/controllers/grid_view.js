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





        $scope.init = function () {
            listingDataService.getListings()
                .then(function success(request) {
                    console.log(request.data);
                    $scope.listings = request.data;
                    $scope.listings.error = false;

                    $scope.currentPage = 0;
                    $scope.pageSize = 3;
                  
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.listings.length / $scope.pageSize);
                    }
                    for (var i = 0; i < $scope.listings.length; i++) {
                        console.log($scope.listings.length);
                       // $scope.data.push("Item " + i);
                    }
                }, function failure(request) {
                    $scope.listings.error = true;
                })
        }
        
    });
app.filter('startFrom', function () {
            return function (input, start) {
                start = +start; //parse to int
                return input.slice(start);
            }
        });