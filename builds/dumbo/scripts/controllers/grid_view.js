'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
//var listings = {
//        'title': "Fancy Sublet",
//        'price': "$$$",
//        'description':"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla eros vel neque vulputate pulvinar ut id nisi. Sed ligula erat, pharetra a placerat ac, scelerisque sed augue. Proin congue et nunc in tempor. Morbi ac egestas eros. Proin quis ipsum nec odio eleifend mattis sit amet nec purus. Morbi ultricies urna neque, eu tincidunt orci aliquet ut. Pellentesque volutpat diam sit amet commodo tempus. Nunc sollicitudin ex at venenatis auctor.",
//        'name': "Seller Name",
//        'images': {'link1': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Puppy_on_Halong_Bay.jpg', 'link2':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTjNDSzC9fcFLWH0rvFJuXey2kNjXU3KQgB7eXU_bhMH8nq2HZ'}
//
//    }
//    ;





angular.module('dumboApp')
    .controller('GridCtrl', function ($scope, $http) {
        console.log('GridCtrl');
        $http.get('../../get_listing.json').then(function (result) {
            $scope.listings = result.data;
            console.log(result.data);
//            console.log($scope.listings);
        });

  //  console.log(userdata[0].title);


//$scope.listings = [
//    {
//        'title': "Fancy Sublet",
//        'id': "#",
//        'price': "$$$",
//        'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla eros vel neque vulputate pulvinar ut id nisi. Sed ligula erat, pharetra a placerat ac, scelerisque sed augue. Proin congue et nunc in tempor. Morbi ac egestas eros. Proin quis ipsum nec odio eleifend mattis sit amet nec purus. Morbi ultricies urna neque, eu tincidunt orci aliquet ut. Pellentesque volutpat diam sit amet commodo tempus. Nunc sollicitudin ex at venenatis auctor.",
//        'name': "Seller Name",
//        'images': {
//            'link1': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Puppy_on_Halong_Bay.jpg',
//            'link2': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTjNDSzC9fcFLWH0rvFJuXey2kNjXU3KQgB7eXU_bhMH8nq2HZ'
//        }
//},
//    {'title': "Fancy Sublet",
//        'id': "#",
//        'price': "$$$",
//        'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla eros vel neque vulputate pulvinar ut id nisi. Sed ligula erat, pharetra a placerat ac, scelerisque sed augue. Proin congue et nunc in tempor. Morbi ac egestas eros. Proin quis ipsum nec odio eleifend mattis sit amet nec purus. Morbi ultricies urna neque, eu tincidunt orci aliquet ut. Pellentesque volutpat diam sit amet commodo tempus. Nunc sollicitudin ex at venenatis auctor.",
//        'name': "Seller Name",
//        'images': {
//            'link1': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Puppy_on_Halong_Bay.jpg',
//            'link2': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTjNDSzC9fcFLWH0rvFJuXey2kNjXU3KQgB7eXU_bhMH8nq2HZ'
//        }
//    }
//
//]   

    });