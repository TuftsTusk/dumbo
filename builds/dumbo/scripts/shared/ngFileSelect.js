angular.module('dumboApp')
.directive("ngFileSelect", ['imageUploadService', function(imageUploadService){
  return {
    link: function($scope,el){

      el.bind("change", function(e){
		var doneUploadingOneImage = function(url){
			var obj = {'photo_url': url};
			$scope.currentUploadTarget.push(obj);
		}
        var files = (e.srcElement || e.target).files;
		$.each(files, function(index, file){
			imageUploadService.uploadImage(file, doneUploadingOneImage);
		})
      })
    }
  }
}]);
