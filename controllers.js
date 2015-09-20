var dumboApp = angular.module('dumboApp', []);



dumboApp.controller('SellerListCtrl', function ($scope, $http) {  
    $scope.$on('$viewContentLoaded', function(){
        console.log("HEY!");
        $scope.getListings();  
    });
    
    $scope.getListings = function () {
        $http.get('http://130.64.184.174:8080/getListings')
            .success(function(response){$scope.listings = response});
//        $.ajax({
//                type: "GET",
//                url: '130.64.184.174:3000/getListings'
//            })
//            .done(function (data, status) {
//                $scope.listings = data;
//            })

    };
    $scope.getListings();




});