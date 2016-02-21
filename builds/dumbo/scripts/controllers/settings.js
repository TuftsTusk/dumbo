'use strict';

angular.module('dumboApp')
  	.controller('SettingsCtrl', function ($scope) {

		$(document).ready(function() {
			var settings = $('#settings');
			var nav = settings.find('.settingsNav');
			var links = nav.find('a');
			console.log(links);
			console.log(location.hash);

			var curr = $('#settings').find('[href^="' + location.hash + '"]').addClass('active');
			//links.not(curr).removeClass('active');
		});

  	});
