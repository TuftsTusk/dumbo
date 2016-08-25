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
    var date  = new Date(2016, 8, 6);
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

  // $('.countdown').countdown('2016/9/6').on('update.countdown', function(event) {
  //   var $this = $(this).html(event.strftime(''
  //     + '<div><span class="countdownData">%-w</span><span class="countdownName"> week%!w</span></div>:'
  //     + '<span class="countdownData">%-d</span><span class="countdownName"> day%!d</span>:'
  //     + '<span class="countdownData">%H</span><span class="countdownName"> hour</span>:'
  //     + '<span class="countdownData">%M</span><span class="countdownName"> min</span>:'
  //     + '<span class="countdownData">%S</span><span class="countdownName"> sec</span>'));
  // });
  (function(){ var s=document.createElement('script');s.src="http://www.tickcounter.com/loader.js";s.async='async';s.onload=function() { tc_widget_loader('tc_div_57847', 'Countdown', 650, ['1473181200000', 'america-new_york', 'dhms', 'FFFFFF3B5998000000FF0000', '650', 'C0C0C01', 'Tusk Launch']);};s.onreadystatechange=s.onload;var head=document.getElementsByTagName('head')[0];head.appendChild(s);}());

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
