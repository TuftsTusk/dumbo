angular.module('dumboApp')
    .filter('thumbnail', function() {
      return function(url) {
          if (url == null || url == undefined || url == ''){
              return null;
          } else if (_.isObject(url)) {
              return url.photo_url.replace('tuskphotos', 'tuskphotos-output');
          } else {
              return url.replace('tuskphotos', 'tuskphotos-output');
          }
      };
    })
