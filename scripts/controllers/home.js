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
    $scope.optionChosen = false;
    $scope.selectionFlowTitle = 'Welcome';
    $scope.actionItems = [
                          { 'name': 'Shop',
                            'icon': '../images/ic_shopping_cart_black_24px.svg',
                            'class': 'purple',
                            'nextAction': 'buy',
                            'nextActionLink': '',
                            'row': 1,
                            'col': 2
                          },
                          { 'name': 'Sell',
                            'icon': '../images/ic_monetization_on_black_24px.svg',
                            'class': 'deepBlue',
                            'nextAction': 'sell',
                            'nextActionLink': 'new',
                            'row': 1,
                            'col': 2
                          }
                        ]
  }

  $scope.startOver = function(){
    $scope.init();
  }



  $scope.selectAction = function(action){
    if (action.nextAction === 'open'){
      $location.url(action.actionLinkType + '/' + action.actionLink)
    } else {
      $scope.optionChosen = true;
      $scope.selectionFlowTitle = action.name;
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
  }
});
