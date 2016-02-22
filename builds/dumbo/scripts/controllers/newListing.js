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
        'SubletListing': function(str) {
          $scope.newListingFormData = [
            {
              displayName: 'Title',
              name:'title',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              displayName: 'Address',
              name:'address',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              displayName: 'Description',
              name:'description',
              required:'true',
              type:'textarea',
              class:'form-control'
            },
            {
              displayName: 'Utilities',
              name:'utilities',
              type:'text',
              class:'form-control'
            },
            {
              displayName: 'Parking',
              name:'parking',
              type:'checkbox'
            },
            {
              displayName:'Move in Date',
              name:'movein',
              required:true,
              type:'datetime-local',
              class:'form-control'
            }
          ];
        },
        'BookListing': function(str) {
          $scope.newListingFormData = [
            {
              displayName: 'Title',
              name:'title',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              displayName:'ISBN',
              name:'isbn',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              displayName:'Class Name',
              name:'classname',
              required:'false',
              type:'text',
              class:'form-control'
            }
          ];
        },
        'FurnitureListing': function(str) {
            return toTitleCase(str);
        },
        'MiscListing': function(str) {
          $scope.newListingFormData = [
            {
              displayName:'Title',
              name:'title',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              displayName: 'Description',
              name:'description',
              required:'true',
              type:'textarea',
              class:'form-control'
            },
            {
              displayName: 'Price',
              name:'price',
              required:'true',
              type:'number',
              class:'form-control'
            },
          ];
        },
    };

    $scope.init = function(){
      console.log('CreatePostCtrl');
      if(!map[$scope.type]) {
        $scope.type = 'MiscListing';
      }
      $('#newListing h1').text(text + ' Listing');
      text = map[$scope.type]($scope.type);
      $scope.loadSavedData();
    }


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
          var errorMessage = res.data.message.message || "Unknown Error";
          SweetAlert.swal("I'm sorry I can't do that", errorMessage, "error");
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
