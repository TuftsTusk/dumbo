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
  				if ($(window).width() <= 768) {
  					$('.navbar-right #newPostButton').removeClass('btn btn-primary');
  					if ($('.navbar-collapse .searchbar').length) {
  						console.log('true');
  						$('.searchbar').appendTo('.navbar-header');
  					} else {
  						console.log('false');
  					}
  				} else {
  					if (! $('.navbar-collapse .searchbar').length) {
  						$('.searchbar').insertAfter('.navbarShop');
  					}
  				}
  			}


  		});
  	});
