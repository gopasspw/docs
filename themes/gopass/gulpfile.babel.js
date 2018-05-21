'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';

gulp.task('scss', () => gulp.src('./src/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(cleancss())
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('./static/css/')));

gulp.task('js', () => gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./static/js/')));

gulp.task('img', () => gulp.src('./src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./static/img/')));

gulp.task('build', ['scss', 'js', 'img']);

gulp.task('watch', ['build'], () => {
  gulp.watch(['./src/scss/*.scss'], ['scss']);
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/img/*'], ['img']);
});

gulp.task('default', ['watch']);
