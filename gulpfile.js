var gulp          = require('gulp'),
    ts            = require('gulp-typescript'),
    merge         = require('merge2'),
    compass       = require('gulp-compass'),
    browserSync   = require('browser-sync'),
    runSequence   = require('run-sequence');

var tsProject = ts.createProject("tsconfig.json");

gulp.task('compass', function() {
  gulp.src('./src/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'dist/css',
      sass: 'src/sass'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
    return gulp.src("src/scripts/**/*.ts") // or tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist/js"));
});
 
gulp.task('watch', function () {
  gulp.watch('**/*.scss', ['compass']);
  gulp.watch('**/*.html', ['html']);
  gulp.watch('src/ts/**/*.ts', ['scripts']);
  gulp.watch('index.html', browserSync.reload); 
  gulp.watch('dist/js/client/**/app.js', browserSync.reload);
});

gulp.task('img', function() {
  return gulp.src('src/img/*.jpg') // Gets all files ending with
    .pipe(gulp.dest('dist/img'))
});

gulp.task('html', function() {
  return gulp.src('src/view/*.html') // Gets all files ending with
    .pipe(gulp.dest('dist/view'))
})

gulp.task('browserSync', function() {
   browserSync({
    port: 3000,
    files: ['**/*.html', '**/*.css', '**/*.js'],
    injectChanges: true,
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: 'dist',
      index:  'view/index.html'
    }
  });
})

gulp.task('build', ['scripts', 'compass', 'img', 'html']);

gulp.task('serve', function() {
  runSequence('build', 'browserSync', 'watch');
});

gulp.task('default', ['serve']);