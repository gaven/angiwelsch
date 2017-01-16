import gulp from 'gulp';
import webpack from 'webpack-stream';
import loadPlugins from 'gulp-load-plugins';
import browsersync from 'browser-sync';

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

gulp.task('build:scripts', scripts);
