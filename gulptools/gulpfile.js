const gulp = require('gulp');
const concat = require('gulp-concat');
const pump = require('pump');
const replace = require('gulp-replace');

// @todo Use webpack instead of gulp for this task
gulp.task('default', ['build-custom-sass']);

gulp.task('build-custom-sass', () => {
  const orderedPaths = require('./paths.json').paths;

  pump([
    gulp.src(orderedPaths),
    concat('customizable.scss'),
    replace(/@import ["a-z_.\/,\s;]+;/g, ''),
    gulp.dest('../build/'),
  ]);
});
