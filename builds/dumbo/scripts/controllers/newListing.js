'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('NewListingCtrl', function ($scope, $http, listingDataService, SweetAlert, localStorageService, _) {
    console.log(window.location.hash);
    var localStorageKey = 'listingform';
    var url = window.location.hash;
    $scope.type = url.split('#')[2];
    var text;

    var map = {
        'sublet': function(str) {
          $scope.newListingFormData = [
            {
              name:'Title',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              name:'Address',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              name:'Description',
              required:'true',
              type:'textarea',
              class:'form-control'
            },
            {
              name:'Utilities',
              type:'text',
              class:'form-control'
            },
            {
              name:'Parking',
              required:true,
              type:'checkbox'
            },
            {
              name:'Move in Date',
              required:true,
              type:'datetime-local',
              class:'form-control'
            }
          ];
        },
        'book': function(str) {
          $scope.newListingFormData = [
            {
              name:'Title',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              name:'ISBN',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              name:'Class Name',
              required:'false',
              type:'text',
              class:'form-control'
            }
          ];
        },
        'furniture': function(str) {
            return toTitleCase(str);
        },
        'other': function(str) {
          $scope.newListingFormData = [
            {
              name:'Title',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              name:'Description',
              required:'true',
              type:'textarea',
              class:'form-control'
            }
          ];
        },
    };

    if(map[$scope.type]) {
        text = map[$scope.type]($scope.type);
        $('#newListing h1').text(text + ' Listing');
    } else {
        $scope.type = 'other';
        text = map['other']('other');
    }
    console.log('CreatePostCtrl');

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    $scope.submit = function() {
      $scope.dataLoading = true;
      $scope.listing.type = $scope.type;
      listingDataService.newListing($scope.listing).then(
      function success(res){
        $scope.dataLoading = false;
        SweetAlert.swal("Congrats!", "Your post is now submitted for approval", "success");
        localStorageService.remove(localStorageKey);
      },
      function failure(res){
        $scope.dataLoading = false;
        if (res.status === -1) {
          SweetAlert.swal("Woops", "Looks like someone unplugged us. Please try again in a few.", "error");
        } else {
          SweetAlert.swal("I'm sorry I can't do that", res.data.message.message, "error");
        }
      });
    };

    $scope.loadSavedData = function() {
      $scope.listing = localStorageService.get(localStorageKey) || {};
    }

    $scope.deleteSavedData = function() {
      SweetAlert.swal({title: "Are you sure?",
                      text: "You will not be able to recover this listing draft!",
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: "Yes, start over!",
                      closeOnConfirm: true },
                      function(isConfirm){
                        if (isConfirm){
                          localStorageService.remove(localStorageKey);
                          $scope.listing = {};
                        }
                      });
    }
    $scope.isDataEmpty = function(){
      return _.isEmpty($scope.listing);
    }

    $scope.dataChanged = function(){
      localStorageService.set(localStorageKey, $scope.listing);
    };

});
