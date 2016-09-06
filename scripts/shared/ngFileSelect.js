angular.module('dumboApp')
.directive("ngFileSelect", ['imageUploadService', function(imageUploadService){
  return {
    link: function($scope,el){

      el.bind("change", function(e){
		var doneUploadingOneImage = function(error, url, index){

			if (error) {

			}
			else {
				var obj = {'photo_url': url};
				$scope.currentUploadTarget.push(obj);
				$scope.save();
			}

			$scope.numFilesToUpload--;
			if ($scope.numFilesToUpload == 0) $scope.uploading = false;
		}


        var files = (e.srcElement || e.target).files;
		$scope.numFilesToUpload = files.length;
		$scope.numFilesTotal = files.length;
		$.each(files, function(index, file){
      if ($scope.numFilesTotal > 0){
        $scope.uploading = true;
      }
			imageUploadService.uploadImage(file, index, doneUploadingOneImage);
		})
      })
    }
  }
}]);
