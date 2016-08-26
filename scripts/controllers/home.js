'use strict';

/**
* @ngdoc function
* @name dumboApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the dumboApp
*/
angular.module('dumboApp')
.controller('HomeCtrl', function ($scope, userService, $location, EnvironmentConfig) {
  $scope.EnvironmentConfig = EnvironmentConfig;
  $scope.isLoggedIn = function() {
    return userService.isLoggedIn();
  }

  function timeToLaunch(){
    // Sept 6th
    var date  = new Date(2016, 8, 6, 13);
    var now   = new Date();
    var diff  = date.getTime()/1000 - now.getTime()/1000;
    if (diff < 0) {
      diff = 0;
    }
    return diff;
  }

  var clock = $('.countdown').FlipClock(timeToLaunch(), {
    clockFace: 'DailyCounter',
    countdown: true
  });

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
    $('#clock-small').countdown('2016/09/06 13:00:00', function(event) {
      $(this).html(event.strftime(''
    + '<span>%-w</span> week%!w '
    + '<span>%-d</span> day%!d '
    + '<span>%H</span> hr '
    + '<span>%M</span> min '
    + '<span>%S</span> sec'));
    });
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
