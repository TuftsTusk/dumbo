'use strict';

angular.module('dumboApp')
	.controller('NavCtrl', function ($scope, userService, userDataService, EnvironmentConfig) {

		$scope.init = function(){
			$scope.closeFlyouts();
			$scope.isCollapsed = true;
			$scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
				$scope.closeFlyouts();
    	});
			if (EnvironmentConfig.production){
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	      ga('create', 'UA-83197407-1', 'auto');
	      ga('send', 'pageview');
			}
		};

		$scope.closeFlyouts = function(){
			$scope.newFlyoutOpen = false;
			$scope.settingsFlyoutOpen = false;
		};

		$scope.isLoggedIn = function(){
		 	return userService.isLoggedIn();
		}
		$scope.logout = function(){
			userService.setLoggedOut();
			userDataService.logout();
		}
		$scope.requestEmail = function(){
			return userService.requestEmail();
		}

		$scope.openNewFlyout = function(){
			$scope.settingsFlyoutOpen = false;
			$scope.newFlyoutOpen = !$scope.newFlyoutOpen;
		};

		$scope.openSettingsFlyout = function(){
			$scope.newFlyoutOpen = false;
			$scope.settingsFlyoutOpen = !$scope.settingsFlyoutOpen;
		};

		$scope.EnvironmentConfig = EnvironmentConfig;
	});
