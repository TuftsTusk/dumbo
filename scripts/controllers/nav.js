'use strict';

angular.module('dumboApp')
	.controller('NavCtrl', function ($scope, userService, userDataService, EnvironmentConfig, $location, listingMap, $route, $routeParams) {

        $scope.init = function(){
            $scope.closeFlyouts();
            $scope.isCollapsed = true;
            $scope.$on('$routeChangeSuccess', function (e, current, pre) {
                $scope.isCollapsed = true;
                $scope.closeFlyouts();
                $scope.listingType = $route.current.$$route.listingType || $routeParams.listingType;
                $scope.listingDisplayName = ($scope.listingType) ? listingMap.getListingTypeByType($scope.listingType) : null;
            });
        };

		$scope.$on('SEARCH_TERM', function(event, query) {
			if (query){
                $scope.searchInput = decodeURIComponent(query);
            }else{
                query = '';
            }
		});
		$scope.search = function(input){
			if (input != ''){
				$location.path('/listing/search/' + encodeURIComponent(input) + ($scope.listingType ? '/type/' + $scope.listingType : ''));
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
