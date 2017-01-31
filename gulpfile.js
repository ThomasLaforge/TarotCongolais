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
    publicPathServer: __dirname + '/dist/scripts/server',
    client: {
        path: __dirname + '/src/scripts/client',
        main: 'main.ts',
        result: 'app.js'
    },
    server: {
        path: __dirname + '/src/scripts/server',
        main: 'main.ts',
        result: 'app.js'
    }
};

gulp.task('compass', function() {
    gulp.src('./src/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'dist/css',
            sass: 'src/sass'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts-server', function() {
    let bundler = browserify({ basedir: config.server.path })
        .add(config.server.path + '/' + config.server.main)
        .plugin(tsify, { target: 'ES5' });

    return bundler.bundle()
        .on('error', function(error) { console.error(error.toString()); })
        .pipe(source(config.server.result))
        //.pipe(uglify())
        //.pipe(gzip())
        .pipe(gulp.dest(config.publicPathServer));
});

gulp.task('scripts', function() {
    var tsResult = gulp.src(["src/scripts/server/**/*.ts", "src/scripts/modules/**/*.ts"]) // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist/scripts/server'));
});

gulp.task('scripts-client', function() {
    let bundler = browserify({ basedir: config.client.path })
        .add(config.client.path + '/' + config.client.main)
        .plugin(tsify, { target: 'ES5' });

    return bundler.bundle()
        .on('error', function(error) { console.error(error.toString()); })
        .pipe(source(config.client.result))
        //.pipe(uglify())
        //.pipe(gzip())
        .pipe(gulp.dest(config.publicPathClient));
});

gulp.task('watch', function() {
    gulp.watch('**/*.scss', ['compass']);
    gulp.watch('**/*.html', ['html']);
    gulp.watch('src/ts/**/*.ts', ['scripts-client']);
    gulp.watch('src/ts/**/*.ts', ['scripts-server']);
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
            index: 'view/index.html'
        }
    });
})

gulp.task('build', ['scripts-server', 'scripts-client', 'compass', 'img', 'html']);

gulp.task('serve', function() {
    runSequence('build', 'browserSync', 'watch');
});

gulp.task('default', ['serve']);