'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('CreatePostCtrl', function ($scope, $http) {

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
        $('#create_post h1').text(text + ' Listing');
    } else {
        alert('Bad url!');
    }

    

    var server = "http://tuftstusk.herokuapp.com"
    $scope.$on('$viewContentLoaded', function () {
        $scope.getListings();
    });
    console.log('CreatePostCtrl');
    $scope.getListings = function () {
        $http.get(server + '/listing')
            .success(function (response) {
                $scope.listings = response
            });
    };
    $scope.getListings();

    function post_form() {
        var vm = this;

        vm.user = {};

        vm.userFields = [
            {
                key: 'name',
                type: 'input',
                templateOptions: {
                    type: 'name',
                    label: 'Listing Title',
                    placeholder: 'hybrid bicycle...'
                }
    },
            {
                key: 'price',
                type: 'input',
                templateOptions: {
                    type: 'price',
                    label: 'Price',
                    placeholder: '10'
                }
    },
            {
                key: 'file',
                type: 'file',
                templateOptions: {
                    label: 'Image upload',
                    description: 'Example block-level help text here',
                    url: 'https://example.com/upload'
                }
    },
            {
                key: 'checked',
                type: 'checkbox',
                templateOptions: {
                    label: 'Check me out'
                }
    }
        ];

    };

    post_form();

    $scope.submit = function () {
        $http.post(server + '/listing', {
                name: $scope.title,
                description: $scope.description,
                price: $scope.price,
                user: $scope.user,
                image: $scope.photo_link
            }).success(function() {
                window.history.back();
        });

};

});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
