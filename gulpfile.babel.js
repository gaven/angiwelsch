'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./gulp/tasks', { recurse: true });

const watch = () => {
  gulp.watch(['./_app/styles/**/*.scss'], ['build:styles']);
  gulp.watch(['./_app/scripts/**/*.js'], ['build:scripts']);
  gulp.watch(['./_app/images/*'], ['build:images']);
  gulp.watch(['**/*.html', '**/*.md', '**/*.yml', '!_site/**/*.*'], ['build:reload']);
  gulp.watch(['./css/*.css', './scripts/*.js'], ['build:reload']);
};

gulp.task('default', ['browser-sync'], watch);
