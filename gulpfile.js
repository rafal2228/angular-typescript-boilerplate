var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var typescript = require('gulp-typescript');
var annotate = require('gulp-ng-annotate');

var pathToBower = '/home/rafal/Git/ls/bower_components/' // Change to your absolute path

gulp.task('inject-bower', function () {
  gulp.src('./app/index.jade')
    .pipe(inject(gulp.src(mainBowerFiles(), {read: false, base: pathToBower}), {relative: true, addRootSlash: false}))
    .pipe(gulp.dest('./app'));
});

gulp.task('sass', function () {
  gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('jade', function() {
  gulp.src(['./app/components/**/*.jade', './app/states/**/*.jade', './app/index.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('typescript', function() {
  gulp.src('./app/**/*.ts')
    .pipe(typescript({
      out: 'app.js'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('annotate', function() {
  gulp.src('./build/app.js')
    .pipe(annotate())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./app/styles/**/*.scss', ['sass']);
  gulp.watch(['./app/components/**/*.jade', './app/states/**/*.jade', './app/index.jade'], ['jade']);
  gulp.watch('./bower_components', ['inject-bower']);
  gulp.watch(['./app/components/**/*.ts', './app/states/**/*.ts', './app/app.ts'], ['typescript', 'annotate']);
});


gulp.task('default',['inject-bower', 'sass', 'jade', 'typescript', 'annotate', 'watch'], function() {

});