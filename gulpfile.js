var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect');


gulp.task('express', function(){
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(process.env.PORT || 9000);
});

gulp.task('html', function () {
  gulp.src('builds/dumbo/*.html')
    .pipe(connect.reload());
});

gulp.task('views', function () {
  gulp.src('builds/dumbo/views/*')
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src('builds/dumbo/scripts/**/*')
    .pipe(connect.reload());
    // .pipe(jshint('./.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
    gulp.src('process/sass/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('builds/dumbo/styles'))
      .pipe(connect.reload());
});

// gulp.task('partials', function () {
//     gulp.src('process/partials/*')
//       .pipe(sass().on('error', sass.logError))
//       .pipe(gulp.dest('builds/dumbo/styles'))
//       .pipe(connect.reload());
// });

gulp.task('watch', function() {
  gulp.watch('builds/dumbo/*.html', ['html']);
  gulp.watch('builds/dumbo/views/*.html', ['views']);
  gulp.watch('builds/dumbo/scripts/**/*', ['js']);
  gulp.watch(['process/sass/**/*'], ['sass']);
});

gulp.task('serve', ['express'], function() {
  connect.server({
    livereload: true,
    root: 'builds/dumbo'
  });
});

// gulp.task('webserver', function() {
//     gulp.src('')
//         .pipe(webserver({
//             livereload: true,
//             open: true
//         }));
// });

gulp.task('production', ['serve'], function(){

});

gulp.task('default', ['sass', 'watch', 'serve']);
