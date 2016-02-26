'use strict';

angular.module('dumboApp')
  	.controller('SettingsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
		$(document).ready(function() {
			updateSettingsNav();

			$(window).on('hashchange', function() {
				updateSettingsNav();
			});

			function updateSettingsNav() {
				var page = $routeParams.page;
				var curr = $('#settings .settingsNav').find('[href="' + window.location.hash + '"]').addClass('active');
			}
		});

  	}]);
