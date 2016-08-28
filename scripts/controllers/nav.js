'use strict';

angular.module('dumboApp')
	.controller('NavCtrl', function ($scope, userService, userDataService, EnvironmentConfig, $location) {

		$scope.init = function(){
			$scope.closeFlyouts();
			$scope.isCollapsed = true;
			$scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
				$scope.closeFlyouts();
				$scope.searchInput = '';
    	});
		};

		$scope.search = function(input){
			if (input != ''){
				$location.path('/listing/search/' + input);
			}

		};

		$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
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
