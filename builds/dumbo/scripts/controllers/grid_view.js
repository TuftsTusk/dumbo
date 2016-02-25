'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
    .controller('GridCtrl', function ($scope) {
        console.log('GridCtrl');

        $scope.title = "Fancy Sublet";
        $scope.price = "$$$";
        $scope.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla eros vel neque vulputate pulvinar ut id nisi. Sed ligula erat, pharetra a placerat ac, scelerisque sed augue. Proin congue et nunc in tempor. Morbi ac egestas eros. Proin quis ipsum nec odio eleifend mattis sit amet nec purus. Morbi ultricies urna neque, eu tincidunt orci aliquet ut. Pellentesque volutpat diam sit amet commodo tempus. Nunc sollicitudin ex at venenatis auctor.";
        $scope.name = "Seller Name";
    
    });