var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var resolveDependencies = require('gulp-resolve-dependencies');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['js/*.js', 'js/*/*.js'])
        .pipe(resolveDependencies({
            pattern: /\* @requires [\s-]*(.*?\.js)/g
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['js/*.js', 'js/*/*.js'], ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);