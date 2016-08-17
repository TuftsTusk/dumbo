'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:SubCtrl
 * @description
 * # SubCtrl
 * Controller of the dumboApp
 */

var mylat;
var mylng;





angular.module('dumboApp')
    .controller('SubCtrl', function ($scope, $http) {
        $http.get('../../fixtures/housing.json').then(function (result) {
            $scope.listings = result.data;

            initMap(42.4059385, -71.1197832);
        });
        var test;
        var markers = [];
        $http.get('../../fixtures/housing.json').then(function (result) {
            $scope.places = result.data;

            for (var i = 0; i < $scope.places.length; i++) {

                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


                var start_date = new Date($scope.places[i].bedrooms[0].date_start);
                var end_date = new Date($scope.places[i].bedrooms[0].date_end)


                var format_start = months[start_date.getMonth()-1] + " " + start_date.getDate() + ", " +start_date.getFullYear();
                var format_end = months[end_date.getMonth()-1] + " " + end_date.getDate() + ", " +end_date.getFullYear();


                $(".dates").html(format_start + "  -- <br>" + format_end);

                var contentstring = '<div class="col-sm-6"><img style="max-width:75px;margin-top:10px;" ng-src=' + $scope.places[i].common_area_photos.living_room[0] + '/img></div><div class="col-sm-6"><h1>$' + $scope.places[i].bedrooms[0].rent + '</h1><p>' + $scope.places[i].apt_info.address + '</p> <a ng-href="#/subletListing/{{listing.user_id}}"><button class="btn btn-primary">View Listing</button></a></div>';


                markers.push(
                    [$scope.places[i].user_id, parseFloat($scope.places[i].apt_info.lat), parseFloat($scope.places[i].apt_info.lng), $scope.places[i].rent, $scope.places[i].common_area_photos.living_room[1], contentstring]
                )


                var marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat($scope.places[i].apt_info.lat),
                        lng: parseFloat($scope.places[i].apt_info.lng)
                    },
                    content: contentstring,
                    map: map,
                    title: $scope.places[i].user_id,
                    icon: {
                        url: "../../images/LOGO.svg",
                        scaledSize: new google.maps.Size(25, 32)
                    },
                    index: i
                });



                var infowindow = new google.maps.InfoWindow({
                    content: contentstring

                });


                marker.addListener('click', function () {

                    infowindow.setContent(this.content);
                    infowindow.open(map, this);
                    marker.setMap(map);

                    $('html, body').animate({
                        scrollTop: $(".sub-info").eq(this.index).offset().top - $("nav").height()
                    }, 800);

                    $(".sublet-listings").eq(this.index).addClass("highlight");




                    //map.panTo({lat: parseFloat(marker.position.lat), lng: parseFloat(marker.position.lng)})

                });

                infowindow.addListener('closeclick', function () {
                    console.log("clicked!");
                    $(".sublet-listings").removeClass("highlight");
                })
            }
        });


        //    map.panTo({lat:mlat})

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

        $scope.init = function () {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {

                    mylat = position.coords.latitude;
                    mylng = position.coords.longitude;

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
                        here.setMap(map);
                        map.panTo({
                            lat: mylat,
                            lng: mylng
                        });
                        console.log(this.lat);

                    });
                }, function (err) {
                    console.log(err);
                });


            } else {

            }




        };


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
