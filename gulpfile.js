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
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Compile Our Sass
gulp.task('sass', function() {
    gulp.src('src/scss/mosaic.scss')
        .pipe(gulp.dest('./dist/scss'))
        .pipe(sass())
        .pipe(rename('mosaic.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./'))
        .pipe(minify())
        .pipe(rename('mosaic.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./'));

    var stream = gulp.src('src/scss/examples.scss')
        .pipe(sass())
        .pipe(rename('examples.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minify())
        .pipe(rename('examples.min.css'))
        .pipe(gulp.dest('./dist/css'));

    return stream;
});

// Build examples from templates
gulp.task('swig', function(){
    var stream = gulp.src('src/html/**/*.html')
        .pipe(swig())
        .pipe(gulp.dest('./dist'));

    return stream;
});

// Move vendor files to dest
gulp.task('vendor', function(){
    var stream = gulp.src('src/vendor/**/*.*')
        .pipe(gulp.dest('./dist'));

    return stream;
});

// Concatenate & Minify JS
gulp.task('js', function() {
    var stream = gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'src/js/documentation.js'
        ])
        .pipe(concat('documentation.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('documentation.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    return stream;
});



// Clean build
gulp.task('clean', function() {
    var stream = gulp.src([
            'dist',
            'mosaic.css',
            'mosaic.min.css'
        ])
        .pipe(clean({force: true}));

    return stream;
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/html/**/*.html', ['swig']);
    gulp.watch('src/js/**/*.js', ['js']);
});

// Default Task
gulp.task('default', ['sass', 'swig', 'vendor', 'js', 'watch']);