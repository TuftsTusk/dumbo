'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  	.controller('HomeCtrl', function ($scope, userService) {
        $scope.isLoggedIn = function() {
            return userService.isLoggedIn();
        }
  	});
