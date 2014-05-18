var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var resolveDependencies = require('gulp-resolve-dependencies');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var declare = require('gulp-declare');
var rename = require('gulp-rename');

var JS_DIRS = ['client/js/*.js', 'client/js/*/*.js'];
var SASS_DIRS = ['client/scss/*.scss']
var HBS_DIRS = ['client/hbs/*.hbs'];

// Lint Task
gulp.task('lint', function() {
    return gulp.src(JS_DIRS)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src(SASS_DIRS)
        .pipe(sass({errLogToConsole: true}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('static/css'));
});

// Process client-side templates
gulp.task('templates', function(){
    return gulp.src(HBS_DIRS)
        .pipe(handlebars())
        .pipe(defineModule('plain'))
        .pipe(declare({
            namespace: 'Templates'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('static/js'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(JS_DIRS)
        .pipe(resolveDependencies({
            pattern: /\* @requires [\s-]*(.*?\.js)/g
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('static/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(HBS_DIRS, ['templates']);
    gulp.watch(JS_DIRS, ['lint', 'scripts']);
    gulp.watch(SASS_DIRS, ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'templates', 'scripts', 'watch']);