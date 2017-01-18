import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';

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
};

gulp.task('build:scripts', scripts);
