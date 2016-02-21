'use strict';

angular.module('dumboApp')
  	.controller('SettingsCtrl', function ($scope) {
		$(document).ready(function() {
			updateSettingsNav();

			$(window).on('hashchange', function() {
				updateSettingsNav();
			});

			function updateSettingsNav() {
				var curr = $('#settings .settingsNav').find('[href^="' + window.location.hash + '"]').addClass('active');
			}
		});

  	});
