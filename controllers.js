var dumboApp = angular.module('dumboApp', []);



dumboApp.controller('SellerListCtrl', function ($scope, $http) {
    var server = "http://tuftstusk.herokuapp.com"
    $scope.$on('$viewContentLoaded', function () {
        $scope.getListings();
    });

    $scope.getListings = function () {
        $http.get(server + '/getListings')
            .success(function (response) {
                $scope.listings = response
            });
        //        $.ajax({
        //                type: "GET",
        //                url: '130.64.184.174:3000/getListings'
        //            })
        //            .done(function (data, status) {
        //                $scope.listings = data;
        //            })

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
