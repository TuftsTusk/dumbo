'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('NewListingCtrl', function ($scope, $http, listingMap, listingDataService, SweetAlert, localStorageService, _) {
    var localStorageKey = 'listingform';
    var url = window.location.hash;
    $scope.type = url.split('#')[2];
    var text;

    $scope.init = function(){
      $scope.newListingFormData = listingMap.getFieldsByType($scope.type);
      $scope.newListingFormData.type = listingMap.getListingTypeByType($scope.type);
      console.log($scope.listing);
      $scope.loadSavedData();
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
          var errorMessage;
          if (!res.data && res.data.message && res.data.message.message) {
            errorMessage = res.data.message.message;
            SweetAlert.swal("I'm sorry I can't do that", errorMessage, "error");
          }
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
