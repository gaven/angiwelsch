import browsersync from 'browser-sync';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import webpack from 'webpack-stream';

const reload = browsersync.reload;
const $ = loadPlugins();

const scripts = () => {
  return gulp.src('./_app/scripts/global.js')
    .pipe(webpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: '/node_modules/',
          query: { compact: false }
        }]
      }
    }))
    .pipe($.rename('app.js'))
    .pipe(gulp.dest('./scripts'))
    .pipe(reload({stream: true}));
};

const reloadScripts = (done) => {
  runSequence('build:scripts', 'build:reload', () => {
    done();
  });
};

gulp.task('build:scripts', scripts);
gulp.task('watch:scripts', reloadScripts);
