var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('express', function(){
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(process.env.PORT || 9000);
});
gulp.task('serve', ['express'], function() {
  connect
    .server({
    livereload: true,
    open:true
  });
});

gulp.task('production', ['express'], function(){

});

gulp.task('default', ['webserver']);
