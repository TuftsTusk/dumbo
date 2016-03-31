angular.module('dumboApp')
    .service('imageUploadService', function($http,$q, EnvironmentConfig) {

  var host = EnvironmentConfig.api;
  var sign = '/sign_s3';
  delete $http.defaults.headers.common['X-Requested-With'];
  this.uploadImage = function(file, event, flow) {
    //TODO: Errors for image upload
    console.log(file);
    if (file && file.file) {
      $http.get(host + sign + "?file_type="+file.file.type)
      .then(function(response){
        $http.post(response.data, file)
        console.log(response);
      });
    }
  }
  this.getSignedURL = function() {
    return $http.get(host + sign + "?file_type=image/png");
  }
});
