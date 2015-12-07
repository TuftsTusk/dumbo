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
  	console.log('ListingsCtrl');


	$(document).ready(function() {
		var filters = {};
		filters['semester'] = $('.semesters');

		initFilters(filters);

		function initFilters(filters) {
			var sem = filters['semester'],
				semComponents = {};
			semComponents['btn_left'] = sem.find('.left');
			semComponents['btn_right'] = sem.find('.right');
			semComponents['semWrapper'] = sem.find('.semWrapper');
			semComponents['slide_element'] = sem.find('.slide_element');
			//var filterTotWidth = setFilterWidth(semComponents);
			
			semComponents['btn_left'].click(function() {
				updateSlide(semComponents, 'left');
			});

			semComponents['btn_right'].click(function() {
				updateSlide(semComponents, 'right');
			});
		}
		
		

		function updateSlide(semComponents, string) {
			console.log(string);
			var semIndex = 0;
			if (can_move(string, semIndex)) {
				//semIndex++;
				var wrapperWidth = semComponents['semWrapper'].width();
				var operation;
				if (string =='left') {
					operation = '+=';
				} else if (string == 'right') {
					operation = '-=';
				}

				semComponents['slide_element'].css('margin-left', operation + (wrapperWidth+10));
			}
		}


		function can_move(direction, index) {
	  		// if (direction == 'left') return index > 0;
	  		// if (direction == 'right') return index < $scope.semesters.length - 1;
	  		return true;
	  	}
	});
  });
