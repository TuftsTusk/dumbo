angular.module('dumboApp')
  	.controller('WantedCtrl', function ($scope, listingDataService) {
        var colorIndex = 0;
        $scope.init = function(){
            $scope.wantedInput = '';
            $scope.wanteds = [];
            $scope.getRandomButtonColor();
        }
        $scope.addToWanted = function(event){
            if (event.which === 13 && $scope.wantedInput) { //on enter
                console.log($scope.wantedInput);
                $scope.wanteds.push({text:$scope.wantedInput});
                $scope.wantedInput = '';
                $scope.getRandomButtonColor();

            }

        }
        var styles = ['info', 'success', 'warning']
        $scope.getRandomButtonColor = function(){
            var nextColorIndex = (colorIndex >= (styles.length - 1)) ? 0: (colorIndex + 1);
            $scope.randomButtonColor = styles[colorIndex];
            $scope.nextRandomButtonColor = styles[nextColorIndex];
            colorIndex = nextColorIndex;
        }
  	});
