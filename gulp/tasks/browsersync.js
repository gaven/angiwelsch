import gulp from 'gulp';
import browsersync from 'browser-sync';
import sequence from 'run-sequence';

gulp.task('build', done => {
  sequence('build:styles', 'build:scripts', 'build:thumbs', 'build:images', 'build:jekyll', done);
});

gulp.task('browser-sync', ['build'], () => {
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
