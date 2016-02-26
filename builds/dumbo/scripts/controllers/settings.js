'use strict';

angular.module('dumboApp')
  	.controller('SettingsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
		var page = $routeParams.page;

		var pages = {
			'account': function() {
				return {
					title: 'Account settings',
					subtitle: 'Your personal information. Only your first name is publicly visible.'
				};
			},
			'addresses': function() {
				return {
					title: 'Addresses',
				};
			},
			'notifications': function() {
				return {
					title: 'Notification settings',
				};
			},
			'default': function() {
				return {
					title: page
				};
			}
		}

		if (pages[page]) {

			$scope.page = pages[page]();
		} else {
			$scope.page = pages['default']();
		}

		//$scope.page = pages(page) ? pages(page) : pages(default);

		updateSettingsNav();
		$(window).on('hashchange', function() {
			updateSettingsNav();
		});





		function updateSettingsNav() {
			var curr = $('#settings .settingsNav').find('[href="' + window.location.hash + '"]').addClass('active');
		}

  	}]);
