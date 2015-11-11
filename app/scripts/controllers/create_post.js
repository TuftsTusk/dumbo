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
    var server = "http://tuftstusk.herokuapp.com"
    $scope.$on('$viewContentLoaded', function () {
        $scope.getListings();
    });

    $scope.getListings = function () {
        $http.get(server + '/getListings')
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
        $http.post(server + '/addListing', {
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
