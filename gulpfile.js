var gulp = require('gulp'),
    merge = require('merge2'),
    compass = require('gulp-compass'),
    ts = require('gulp-typescript'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify');

var tsProject = ts.createProject('tsconfig.json');

let config = {
    publicPathClient: __dirname + '/dist/scripts/client',
    client: {
        path: __dirname + '/src/scripts/client',
        main: 'main.ts',
        result: 'app.js'
    }
};

gulp.task('compass', function() {
    gulp.src('./src/stylesheet/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'dist/css',
            sass: 'src/stylesheet'
        }))
        .pipe(gulp.dest('dist/css'));
});

// gulp.task('scripts-server', function() {
//     return gulp.src(["src/scripts/server/**/*.ts", "src/scripts/modules/**/*.ts"]) // or tsProject.src()
//         .pipe(tsProject())
//         // .pipe(gulp.dest(config.publicPathServer))
// });

gulp.task('scripts-client', function() {
    let bundler = browserify({ basedir: config.client.path })
        .add(config.client.path + '/' + config.client.main)
        .plugin(tsify, { target: 'ES5' })

    return bundler.bundle()
        .on('error', function(error) { console.error(error.toString()); })
        .pipe(source(config.client.result))
        //.pipe(uglify())
        //.pipe(gzip())
        .pipe(gulp.dest(config.publicPathClient));
});

gulp.task('watch', function() {
    gulp.watch('src/stylesheet/**/*.scss', ['compass']);
    gulp.watch('src/index.html', ['html']);
    gulp.watch(['src/scripts/modules/**/*.ts', 'src/scripts/client/**/*.ts', 'src/scripts/vue/**/*.ts'], ['scripts-client']);
    // gulp.watch(['src/scripts/modules/**/*.ts', 'src/scripts/server/**/*.ts'], ['scripts-server']);
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('dist/scripts/client/app.js', browserSync.reload);
});

gulp.task('img', function() {
    return gulp.src(['src/img/**/*.jpg', 'src/img/**/*.jpeg']) // Gets all files ending with
        .pipe(gulp.dest('dist/img'))
});

gulp.task('html', function() {
    return gulp.src('src/index.html') // Gets all files ending with
        .pipe(gulp.dest('dist'))
})

gulp.task('js-libs', () => {
    return gulp.src([
            'node_modules/vue/dist/vue.js',
            'node_modules/vue-router/dist/vue-router.js'
        ])
        .pipe(gulp.dest('dist/libs/js'));
});

gulp.task('browserSync', function() {
    browserSync({
        port: 3000,
        files: ['**/*.html', '**/*.js', '**/*.css'],
        injectChanges: true,
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: 'dist',
            index: 'index.html'
        },
        socket: {},
        ghostMode: false
    });
})

gulp.task('build', ['scripts-client', 'compass', 'img', 'html', 'js-libs']);

gulp.task('serve', function() {
    runSequence('build', 'browserSync', 'watch');
});

gulp.task('default', ['serve']);