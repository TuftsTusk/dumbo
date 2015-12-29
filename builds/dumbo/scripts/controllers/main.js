'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  	.controller('MainCtrl', function ($scope) {
  		console.log('MainCtrl');

  		$(document).ready(function() {

  			updateNav();
  			$(window).resize(function() {
  				updateNav();
  			})

  			function updateNav() {
  				var b_small = 768,
  					b_medium = 992;
  				if ($(window).width() <= b_small) {
  					$('.navbar-right #newPostButton').removeClass('btn btn-primary');
  					if ($('.navbar-collapse .searchbar').length) {
  						$('.searchbar').appendTo('.navbar-header');
  					}
  				} else {
  					$('.navbar-right #newPostButton').addClass('btn btn-primary');
  					if (! $('.navbar-collapse .searchbar').length) {
  						$('.searchbar').insertAfter('.navbarMain');
  					}
  				}

  				if ($(window).width() <= 1051) {

  					$('.navbarShop .dropdown-toggle').show();
  					$('.navbarShop').addClass('dropdown');
  					$('.navbarShop ul').removeClass('nav navbar-nav');
  					$('.navbarShop ul').addClass('dropdown-menu');
  				
  				} else {
   					$('.navbarShop .dropdown-toggle').hide();
  					$('.navbarShop').removeClass('dropdown');
  					$('.navbarShop ul').addClass('nav navbar-nav');
  					$('.navbarShop ul').removeClass('dropdown-menu');
  				}
  			}

  		});
  	});
