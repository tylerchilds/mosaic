// Include gulp
var gulp = require('gulp');

// node file system
var fs = require('fs');

// Include Our Plugins
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var swig = require('gulp-swig');

// Compile Our Sass
gulp.task('sass', function() {
    gulp.src('src/scss/re-grid.scss')
        .pipe(gulp.dest('./dist/scss'))
        .pipe(rename('re-grid.less'))
        .pipe(gulp.dest('./dist/less'))
        .pipe(sass())
        .pipe(rename('re-grid.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./'))
        .pipe(minify())
        .pipe(rename('re-grid.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./'));

    gulp.src('src/scss/base.scss')
        .pipe(sass())
        .pipe(rename('base.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minify())
        .pipe(rename('base.min.css'))
        .pipe(gulp.dest('./dist/css'));

    gulp.src('src/scss/examples.scss')
        .pipe(sass())
        .pipe(rename('examples.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minify())
        .pipe(rename('examples.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

// Build examples from templates
gulp.task('swig', function(){
    gulp.src('src/html/**/*.html')
        .pipe(swig())
        .pipe(gulp.dest('./dist'));
});


// Clean build
gulp.task('clean', function() {
    gulp.src([
            'dist',
            're-grid.css',
            're-grid.min.css'
        ])
        .pipe(clean({force: true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/html/**/*.html', ['swig']);
});

// Default Task
gulp.task('default', ['sass', 'swig', 'watch']);