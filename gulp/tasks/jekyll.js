import gulp from 'gulp';
import cp from 'child_process';
import browsersync from 'browser-sync';

const reload = browsersync.reload;

const jekyll = (done) => {
    return cp.spawn('jekyll', ['build'], {
      stdio: 'inherit'
    })
    .on('close', done);
};

gulp.task('build:jekyll', jekyll);

gulp.task('build:reload', ['build:jekyll'], () => {
  reload();
});
