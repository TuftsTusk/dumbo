'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('NewListingCtrl', function ($scope, $http, listingMap,
                                          listingDataService, SweetAlert,
                                          localStorageService, _, userDataService,
                                          imageUploadService, FileUploader, $window) {
    var localStorageKey = 'listingform';
    var url = window.location.hash;
    $scope.userDataService = userDataService;
    $scope.imageUploadService = imageUploadService;
    $scope.type = url.split('#')[2];
    var text;

    $scope.getSignedURL = function(){
      imageUploadService.getSignedURL()
          .then(function(response) {
            console.log("GET NEW SIGNED URL")
            $scope.signedUrl = response.data;
          })
    };



    $scope.init = function(){
      $scope.getSignedURL();
      $scope.uploader = new FileUploader({
        onBeforeUploadItem: function(item) {
            item.url = $scope.signedUrl;
            console.log(item.url);
        },
        onSuccess: function(response, status, headers) {

        },
        onProgress: function(response, status, headers) {
          console.log("COMPLETE")
          $scope.getSignedURL();
        },
        method: 'PUT',
        headers: {'x-amz-acl': 'public-read', 'Content-Type': 'image/png'}
      });
      $scope.newListingFormData = listingMap.getFieldsByType($scope.type);
      $scope.newListingFormData.type = listingMap.getListingTypeByType($scope.type);
      $scope.loadSavedData();
    };


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
