'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */

var mylat;
var mylng;



angular.module('dumboApp')
    .controller('SubCtrl', function ($scope, $http) {
        $http.get('../../get_listing.json').then(function (result) {
            $scope.listings = result.data;

            mylat = $scope.listings.lat;
            mylng = $scope.listings.lng;



            initMap(42.4059385, -71.1197832);
        });
        var test;
        $http.get('../../get_location.json').then(function (result) {
            $scope.places = result.data;

            for (var i = 0; i < $scope.places.length; i++) {
                var mlat = $scope.places[i].lat;
                var mlng = $scope.places[i].lng;
                var note = $scope.places[i].id;



                var marker = new google.maps.Marker({
                    position: {
                        lat: mlat,
                        lng: mlng
                    },
                    map: map,
                    title: note,
                    icon: {
                        url: "../../images/LOGO.svg",
                        scaledSize: new google.maps.Size(25, 32)
                    }
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "contentString",
                    //                    position: {lat: mlat, lng: mlng}
                });

                marker.addListener('click', function () {
                    infowindow.setContent(this.title);
                    infowindow.open(map, this);


                });
            }
        });

        //    map.panTo({lat:mlat})

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


            var here = new google.maps.Marker({
                position: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                map: map
            });

            var infowindow = new google.maps.InfoWindow({
                content: "contentString",
                //                    position: {lat: mlat, lng: mlng}
            });

            here.addListener('click', function () {
                infowindow.setContent("teehee! that tickles");
                infowindow.open(map, this);


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