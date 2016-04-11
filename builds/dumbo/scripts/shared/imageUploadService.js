angular.module('dumboApp')
    .service('imageUploadService', function($http,$q, EnvironmentConfig) {

  var host = EnvironmentConfig.api;
  var sign = '/sign_s3';
  delete $http.defaults.headers.common['X-Requested-With'];
  this.uploadImage = function(file, cb) {
    console.log("HELLO");
    //TODO: Errors for image upload
    console.log(file);
    if (file && file.type) {
      $http.get(host + sign + "?file_type="+file.type)
      .then(function(response){
        $http({method: 'PUT', url: response.data, headers: {'x-amz-acl': 'public-read', 'Content-Type': file.type}, data: file})
        .then(function(){
          cb(response.data);
        });
      });
    }
  }
  this.getSignedURL = function() {
    return $http.get(host + sign + "?file_type=image/png");
  }
});
