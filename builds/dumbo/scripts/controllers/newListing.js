'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('NewListingCtrl', function ($scope, $http, listingDataService, SweetAlert) {
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
      listingDataService.newListing($scope.listing).then(
      function success(res){
        $scope.dataLoading = false;
        SweetAlert.swal("Congrats!", "Your post is now submitted for approval", "success");
      },
      function failure(res){
        $scope.dataLoading = false;
        console.log(res);
        if (res.status === -1) {
          SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
        } else {
          SweetAlert.swal("I'm sorry I can't do that", res.data.message.message, "error");
        }
      });
    }

});
