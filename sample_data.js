var subletApp = angular.module('subletApp', []);

subletApp.controller('SubletListCtrl', function ($scope) {
  $scope.sublets = 
      { 'name': 'Dan',
      'address': '12 pinkham',
      'rent': '600',
      'date': 'Jan 2016 - May 2016'};
});