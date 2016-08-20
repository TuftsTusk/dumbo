'use strict';

angular.module('dumboApp')
	.controller('NavCtrl', function ($scope, userService, userDataService) {

		$scope.init = function(){
			$scope.closeFlyouts();
			$scope.isCollapsed = true;
			$scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
				$scope.closeFlyouts();
    	});
		};

		$scope.closeFlyouts = function(){
			$scope.newFlyoutOpen = false;
			$scope.settingsFlyoutOpen = false;
		};

		$scope.isLoggedIn = function(){
		 	return userService.isLoggedIn();
		}
		$scope.logout = function(){
			userService.setLoggedOut();
			userDataService.logout();
		}
		$scope.requestEmail = function(){
			return userService.requestEmail();
		}

		$scope.openNewFlyout = function(){
			$scope.settingsFlyoutOpen = false;
			$scope.newFlyoutOpen = !$scope.newFlyoutOpen;
		};

		$scope.openSettingsFlyout = function(){
			$scope.newFlyoutOpen = false;
			$scope.settingsFlyoutOpen = !$scope.settingsFlyoutOpen;
		};

		// $(document).ready(function() {
		//
		// 	var b_small = 768,
		// 		b_medium = 992;
		// 	updateNav(b_small, b_medium);
		// 	$(window).resize(function() {
		// 		updateNav(b_small, b_medium);
		// 	})
		//
		// 	$('#newListingButton').click(function() {
		// 		var flyout = $('#newListing').find('.toggleFlyout');
		// 		flyout.toggleClass('hidden');
		// 	});
		//
		// 	$('#accountButton').click(function() {
		// 		var flyout = $('#account').find('.toggleFlyout');
		// 		flyout.toggleClass('hidden');
		// 	});
		//
    //         $('.autotoggle').each(function(i, e) {
    //             $(e).click(function() {
    //                 $('.navbar-toggle').click();
    //             });
    //         });
		//
		// 	$(document).mouseup(function (e) {
		// 		var flyouts = $('.flyoutWrapper');
		// 		flyouts.each(function(index, flyout) {
		// 			var flyout = $(flyout);
		// 			var container = flyout.find('.toggleFlyout');
		// 		    var button = flyout.find('.flyoutButton');
		// 			if (!container.hasClass('hidden') &&
		// 				!container.is(e.target) &&
		// 				!button.is(e.target) &&
		// 				container.has(e.target).length === 0)
		// 			{
		// 				container.addClass('hidden');
		// 			}
		// 		});
		// 	});
		//
		// 	$('.flyoutWrapper').each(function(index, flyout) {
		// 		flyout = $(flyout);
		// 		var link = flyout.find('.toggleFlyout a');
		// 		link.click(function() {
		// 			flyout.find('.toggleFlyout').addClass('hidden');
		// 			if ($(window).width() <= b_small) {
		// 				$('.navbar-toggle').click();
		// 			}
		// 		});
		// 	});
			// $('#newListing .toggleFlyout a').click(function() {
			// 	$('#newListing .toggleFlyout').addClass('hidden');
			// 	if ($(window).width() <= b_small) {
			// 		$('.navbar-toggle').click();
			// 	}
			// });

			// function updateNav(b_small, b_medium) {
			// 	if ($(window).width() <= b_small) {
			// 		$('.navbar-right #newListingButton').removeClass('btn btn-primary');
			// 		if ($('.navbar-collapse .searchbar').length) {
      //                   // take search bar out of nav collapse
			// 			$('.searchbar').appendTo('.navbar-header');
			// 		}
			// 	} else {
			// 		$('.navbar-right #newListingButton').addClass('btn btn-primary');
			// 		if (! $('.navbar-collapse .searchbar').length) {
      //                   // reverse
			// 			$('.searchbar').insertAfter('.navbarMain');
			// 		}
			// 	}
			//
			// 	if ($(window).width() <= 1051) {
      //               // reveal dropdown
			// 		$('.navbarShop .dropdown-toggle').show();
			// 		$('.navbarShop').addClass('dropdown');
      //               // change shop links (sublets, furniture, etc) into a dropdown menu
			// 		$('.navbarShop ul').removeClass('nav navbar-nav');
			// 		$('.navbarShop ul').addClass('dropdown-menu');
			//
			// 	} else {
      //               // reverse
 		// 			$('.navbarShop .dropdown-toggle').hide();
			// 		$('.navbarShop').removeClass('dropdown');
			// 		$('.navbarShop ul').addClass('nav navbar-nav');
			// 		$('.navbarShop ul').removeClass('dropdown-menu');
			// 	}
			// }
		//
		// });
	});
