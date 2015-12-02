'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('ListingsCtrl', function ($scope) {
  	$scope.semesters = ["Spring 2015", "Summer 2015", "Fall 2015"];
  	var semIndex = 0;
  	
  	var can_move = function(direction, index) {
  		if (direction == 'left') return index > 0;
  		if (direction == 'right') return index < $scope.semesters.length - 1;
  	}

	$(document).ready(function() {
		var sem = $('.semesters'),
			semComponents = {};
		// semComponents['navigation'] = 
		var btn_left = sem.find('.left');
		var btn_right = sem.find('.right');
		btn_left.click(function() {
			console.log(semIndex);
			if (can_move('left', semIndex)) {
				semIndex++;
				var width = $(".slide_element > li").width();
				console.log(width);
				$(".fixed_field .slide_element").css("margin-left", "+=" + width);
			}
			
		});

		btn_right.click(function() {
			console.log(semIndex);
			if (can_move('right', semIndex)) {
				semIndex++;
				var width = $(".slide_element > li").width();
				console.log(width);
				$(".fixed_field .slide_element").css("margin-left", "-=" + width);
			}
		});
	});
  });
