'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('NewListingCtrl', function ($scope, $http, listingDataService) {
    $scope.listing = {};
    $scope.newListingFormData = [
      {
        name:'Title',
        required:'true'
      },
      {
        name:'Address',
        required:'true'
      },
      {
        name:'Description',
        required:'true'
      }
    ];
    console.log(window.location.hash);
    var url = window.location.hash;
    var type = url.split('#')[2];
    var text;

    var map = {
        'sublet': function(str) {
            return toTitleCase(str);
        },
        'book': function(str) {
            return toTitleCase(str);
        },
        'furniture': function(str) {
            return toTitleCase(str);
        },
        'other': function(str) {
            return 'Generic';
        },
    };

    if(map[type]) {
        text = map[type](type);
        $('#newListing h1').text(text + ' Listing');
    } else {
        alert('Bad url!');
    }

    console.log('CreatePostCtrl');

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    $scope.submit = function() {
      $scope.dataLoading = true;
      listingDataService.newListing($scope.listing);
    }

});
