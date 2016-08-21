'use strict';

angular.module('dumboApp')
.controller('MainCtrl', function ($scope, Page) {
    $scope.Page = Page;

    $scope.$on('$routeChangeStart', function() {
        Page.setTitle('Tusk');
    });
})
