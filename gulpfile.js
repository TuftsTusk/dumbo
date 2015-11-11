var gulp = require('gulp'),
  connect = require('gulp-connect'),
  history = require('connect-history-api-fallback'),
  middleware = history({
    index: '/app/index.html'
  });

gulp.task('express', function(){
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(9000);
});
gulp.task('serve', ['express'], function() {
  connect
    .server({
    livereload: true,
    open:true
  });
});

gulp.task('default', ['webserver']);
