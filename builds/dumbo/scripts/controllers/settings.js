'use strict';

angular.module('dumboApp')
  	.controller('SettingsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
		var $page = $routeParams.page;

		updateSettingsNav();
		$(window).on('hashchange', function() {
			updateSettingsNav();
		});

		



		function updateSettingsNav() {
			var curr = $('#settings .settingsNav').find('[href="' + window.location.hash + '"]').addClass('active');
		}

  	}]);
