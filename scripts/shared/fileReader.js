angular.module('dumboApp')
    .service('fileReader', function($q, $log, SweetAlert) {
      //modified from http://stackoverflow.com/questions/29328857/angularjs-load-image-to-img-tag-on-file-input

      var onLoad = function(reader, deferred, scope, file) {
          return function () {
              scope.$apply(function () {
                  deferred.resolve(reader.result);
              });
          };
      };

      var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };

      var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

      var getReader = function(deferred, scope, file) {
          var reader = new FileReader();
          reader.onload = onLoad(reader, deferred, scope, file);
          reader.onerror = onError(reader, deferred, scope);
          reader.onprogress = onProgress(reader, scope);
          return reader;
      };
      var errorMessage = function(title, message){
        SweetAlert.swal(title, message, "error");
      }

      this.readAsDataUrl = function(file, scope) {
          var deferred = $q.defer();
          var reader = getReader(deferred, scope, file);
          reader.readAsDataURL(file);
          if (!file){
            return errorMessage ("Photo Upload Failed",  "Please Try Again")
          }
          if (file.type.match('(jpeg|jpg|gif|png)') == null || file.size > 5000000){
            return errorMessage ("Photo Upload Failed", "We accept JPEG, JPG, GIF, or PNG files up to a max size of 5MB.")
          }
          return deferred.promise;
      };
});
