'use strict';

/**
* @ngdoc function
* @name dumboApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the dumboApp
*/
angular.module('dumboApp')
.controller('HomeCtrl', function ($scope, userService, $location) {
  $scope.isLoggedIn = function() {
    return userService.isLoggedIn();
  }

  $scope.init = function() {
    $scope.canGoBack = false;
    $scope.selectionFlowTitle = "Welcome";
    $scope.actionItems = [
                          { 'name': 'Shop',
                            'icon': '../images/furniture.svg',
                            'class': 'purple',
                            'nextAction': 'buy',
                            'nextActionLink': '',
                            'row': 1,
                            'col': 2
                          },
                          { 'name': 'Sell',
                            'icon': '../images/furniture.svg',
                            'class': 'deepBlue',
                            'nextAction': 'sell',
                            'nextActionLink': 'newListing',
                            'row': 1,
                            'col': 2
                          }
                        ]
  }

  $scope.goBack = function(){
    $scope.init();
  }



  $scope.selectAction = function(action){
    $scope.canGoBack = true;
    $scope.selectionFlowTitle = action.name;
    if (action.nextAction === 'open'){
      $location.url(action.actionLinkType)
    }
    $scope.actionItems = [
                          { 'name': 'Sublets',
                            'icon': '../images/sublet.svg',
                            'class': 'purple',
                            'actionType': action.nextAction,
                            'nextAction': 'open',
                            'actionLink': action.nextActionLink,
                            'actionLinkType': 'sublets',
                            'row': 1,
                            'col': 1
                          },
                          { 'name': 'Books',
                            'icon': '../images/book.svg',
                            'class': 'deepBlue',
                            'actionType': action.nextAction,
                            'nextAction': 'open',
                            'actionLink': action.nextActionLink,
                            'actionLinkType': 'books',
                            'row': 1,
                            'col': 1
                          },
                          { 'name': 'Furniture',
                            'icon': '../images/furniture.svg',
                            'class': 'lightPurple',
                            'actionType': action.nextAction,
                            'nextAction': 'open',
                            'actionLink': action.nextActionLink,
                            'actionLinkType': 'furniture',
                            'row': 1,
                            'col': 1
                          },
                          { 'name': 'Miscellaneous',
                            'icon': '../images/everything_else2.svg',
                            'class': 'red',
                            'actionType': action.nextAction,
                            'nextAction': 'open',
                            'actionLink': action.nextActionLink,
                            'actionLinkType': 'misc',
                            'row': 1,
                            'col': 1
                          }
                        ];

  }
});
