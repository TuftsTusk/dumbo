angular.module('dumboApp')
    .service('imageUploadService', function($http,$q, EnvironmentConfig, SweetAlert) {

  var host = EnvironmentConfig.api;
  var sign = '/sign_s3';
  delete $http.defaults.headers.common['X-Requested-With'];

  var errorMessage = function(title, message, cb){
    SweetAlert.swal(title, message, "error");
	return cb(true, null, null);
  }

  this.uploadImage = function(file, index, cb) {
    //TODO: Errors for image upload
    if (!file || !file.type){
      return errorMessage ("Photo Upload Failed",  "Please Try Again", cb)
    }
    if (file.type.match('(jpeg|jpg|gif|png)') == null || file.size > 5000000){
      return errorMessage ("Photo Upload Failed", "We accept JPEG, JPG, GIF, or PNG files up to a max size of 5MB.", cb)
    }
    $http.get(host + sign + "?file_type="+file.type)
    .then(function(response){
      $http({method: 'PUT', url: response.data, headers: {'x-amz-acl': 'public-read', 'Content-Type': file.type}, data: file})
      .then(function(){
	  //trim off AWS authorization headers
	  var formattedUrl = (response.data).split('?')[0];
        cb(false, formattedUrl, index);
      });
    });
  }
  this.getSignedURL = function() {
    return $http.get(host + sign + "?file_type=image/png");
  }
});
