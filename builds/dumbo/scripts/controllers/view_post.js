'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
    .controller('ViewCtrl', function ($scope, $http, $routeParams, listingDataService) {
        $scope.id = $routeParams.id;

//        $http.get('/listing/' + $scope.id).then(function (result) {
//            $scope.listing = result.data.listing;
//            $scope.isOwner = result.data.owner;
//            $scope.source = result.data.listing.photo_urls[0].photo_url;
//            console.log($scope.source);
//
//        });
        $scope.listing = {};
        $scope.listing.error = true;


        $scope.init = function () {
            listingDataService.getListingById($scope.id)
                .then(function (result) {

                    $scope.listing.error = false;
                    $scope.listing = result.data.listing;
                    $scope.isOwner = result.data.owner;
                    if (result.data.listing.photo_urls && result.data.listing.photo_urls.length > 0){
                        $scope.source = result.data.listing.photo_urls[0].photo_url;
                    }
                    console.log($scope.source);
                }, function (result) {
                    $scope.listing.error = true;
                })

        };

        $scope.contactSeller = function(){
        swal({  title: "Contact Seller",
            text: "Enter your message to the seller",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            confirmButtonText: "Send Message",
            inputPlaceholder: "Enter a message",
            showLoaderOnConfirm: true
        },
        function(message){
            if (message === false) return false;
            if (message === "") {
                swal.showInputError("Please enter a message");
                return false
            }
            swal("We're sending your message", "Just a moment");
            listingDataService.contactSeller($scope.id, message).then(
                function success(res){
                    swal("You're message to the seller has been sent", "They will respond to your email address" , "success");
                },
                function failure(res){
                    if (res && res.data && res.data.message) {
                        swal("I'm sorry I can't do that", res.data.message, "error");
                    } else {
                        swal("Sorry it looks like someone unplugged us", "We're working on resolving the issue", "error");
                    }

                }

            )
        });
    }


        $scope.switch_source = function (array_place) {
            $scope.source = $scope.listing.photo_urls[array_place].photo_url;
        };


    });
