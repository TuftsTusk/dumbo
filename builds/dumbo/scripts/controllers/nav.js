'use strict';

angular.module('dumboApp')
	.controller('NavCtrl', function ($scope, userService, userDataService) {
		$scope.isLoggedin = function(){
		 	return userService.isLoggedin();
		}
		$scope.logout = function(){
			userService.setLoggedOut();
			userDataService.logout();
		}
		$scope.requestEmail = function(){
			return userService.requestEmail();
		}

		$(document).ready(function() {

			updateNav();
			$(window).resize(function() {
				updateNav();
			})

			$('#newPostButton').click(function() {
				$(this).parent().find('.toggleFlyout').toggleClass('hidden');
			});

			function updateNav() {
				var b_small = 768,
					b_medium = 992;
				if ($(window).width() <= b_small) {
					$('.navbar-right #newPostButton').removeClass('btn btn-primary');
					if ($('.navbar-collapse .searchbar').length) {
                        // take search bar out of nav collapse
						$('.searchbar').appendTo('.navbar-header');
					}
				} else {
					$('.navbar-right #newPostButton').addClass('btn btn-primary');
					if (! $('.navbar-collapse .searchbar').length) {
                        // reverse
						$('.searchbar').insertAfter('.navbarMain');
					}
				}

				if ($(window).width() <= 1051) {
                    // reveal dropdown
					$('.navbarShop .dropdown-toggle').show();
					$('.navbarShop').addClass('dropdown');
                    // change shop links (sublets, furniture, etc) into a dropdown menu
					$('.navbarShop ul').removeClass('nav navbar-nav');
					$('.navbarShop ul').addClass('dropdown-menu');

				} else {
                    // reverse
 					$('.navbarShop .dropdown-toggle').hide();
					$('.navbarShop').removeClass('dropdown');
					$('.navbarShop ul').addClass('nav navbar-nav');
					$('.navbarShop ul').removeClass('dropdown-menu');
				}
			}

		});
	});
