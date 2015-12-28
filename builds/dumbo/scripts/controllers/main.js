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

  			updateMenu();
  			$(window).resize(function() {
  				updateMenu();
  			})

  			function updateMenu() {
  				if ($(window).width() <= 768) {
  					console.log('inside if');
  					$('#newPost').removeClass('btn btn-primary');
  					$()
  				}
  			}

  			
  		});
  	});
