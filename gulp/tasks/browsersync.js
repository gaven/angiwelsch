import gulp from 'gulp';
import browsersync from 'browser-sync';

gulp.task('browser-sync', ['build:scripts', 'build:styles', 'build:images', 'build:jekyll'], () => {
  browsersync({
    server: {
      baseDir: '_site'
    },
    ghostMode: {
      clicks: true,
      forms: true
    },
    open: false
  });
});
