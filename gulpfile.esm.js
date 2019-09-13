var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var tinyPNG = require('gulp-tinypng-compress');
var minjs = require('gulp-uglify');
var rename = require('gulp-rename');
var svgo = require('gulp-svgo');

import {phpMinify} from '@cedx/gulp-php-minify';

gulp.task('compress:php', () => gulp.src('./src/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('dist/'))
);

gulp.task('svg', () => {
  return gulp.src('src/img/**/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('minify-css', function (cb) {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'));
  cb();
});

gulp.task('min-js', function (cb) {
  return gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
    .pipe(minjs())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));
  cb();
});

gulp.task('move-js', function(cb) {
  return gulp.src(['./src/js/*.min.js'])
    .pipe(gulp.dest('dist/js'));
  cb();
});

gulp.task('move-ico', function(cb){
  return gulp.src('./src/img/*.ico')
    .pipe(gulp.dest('dist/img/'));
  cb();
});

gulp.task('htmlmin', function (cb) {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'));
  cb();
});

gulp.task('fonts', function (cb) {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
  cb();
});

gulp.task('tinypng', function (cb) {
  gulp.src('./src/img/**/*.{png,jpg,jpeg}')
    .pipe(tinyPNG({
      key: 'd979w94GHP9qsmy2rwKJs1XMrNRNvD7g'
    }))
    .pipe(gulp.dest('dist/img/'));
  cb();
});

gulp.task('build', gulp.parallel('minify-css', 'min-js', 'svg', 'move-ico', 'move-js', 'fonts', 'htmlmin', 'compress:php', 'tinypng', function (cb) {
  cb();
}));