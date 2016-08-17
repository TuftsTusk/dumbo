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

				// $scope.isUploading = false;
				$scope.currentUploadTarget.push(obj);
				$scope.save();
			}

			$scope.numFilesToUpload--;
			if ($scope.numFilesToUpload == 0) $scope.uploading = false;
		}


        var files = (e.srcElement || e.target).files;
		$scope.numFilesToUpload = files.length;
		$scope.numFilesTotal = files.length;
		$scope.uploading = true;
		$.each(files, function(index, file){

			imageUploadService.uploadImage(file, index, doneUploadingOneImage);
		})
      })
    }
  }
}]);
