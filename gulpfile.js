// 'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var server = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var csso = require('gulp-csso');
var del = require('del');
var htmlmin = require('gulp-htmlmin')
var autoprefixer = require('autoprefixer');
var pug = require('gulp-pug');

gulp.task('js', () => {
  return gulp.src('source/js/**')
    .pipe(gulp.dest('build/js'))
});

gulp.task('clean', () => {
  return del('build', 'temp');
});

gulp.task('copy', () => {
  return gulp.src([
      'source/fonts/*',
      'source/lib/**'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('css', () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('html', () => {
  return gulp.src('source/pug/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest('build'));
});

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.task('refresh', (done) => {
    server.reload();
    done();
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css', 'refresh'));
  gulp.watch('temp/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('js', 'refresh'));
  gulp.watch('source/pug/**/*.pug', gulp.series('html', 'refresh'));
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'js',
  'css',
  'html'
));

gulp.task('start', gulp.series(
  'build',
  'server'
));
