'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */

var lat;
var lng;



angular.module('dumboApp')
    .controller('SubCtrl', function ($scope, $http) {
        $http.get('../../get_listing.json').then(function (result) {
            $scope.listings = result.data;

            lat = $scope.listings.lat;
            lng = $scope.listings.lng;
            
            new google.maps.Marker({
                position: {
                    lat: parseFloat($scope.listings.lat),
                    lng: parseFloat($scope.listings.lng)
                },
                map: map
            });

            initMap(42.4059385, -71.1197832);
        });

    });

var map;

function initMap(lat, lng) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 15
    });
};

$(document).ready(function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            map.panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });


            new google.maps.Marker({
                position: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                map: map
            });


        }, function (err) {
            console.log(err);
        });
    } else {

    }




});
//
//google.maps.event.addDomListener(window, "load", function () {
//    var myOptions = {
//        zoom: 8,
//        center: (42.4059385,-71.1197832),
//    };
//    var map = new google.maps.Map(document.getElementById("map"),
//        myOptions);
//});