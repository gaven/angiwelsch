import gulp from 'gulp';
import browsersync from 'browser-sync';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';

const $ = loadPlugins();

const icons = () => {
  return gulp.src('./_app/svgs/*.svg')
    .pipe($.changed('./_app/svgs/*.svg'))
    .pipe($.rename({prefix: 'icon-'}))
    .pipe($.svgmin(function (file) {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-'
          }
        }, {
          removeUselessStrokeAndFill: true
        }, {
          removeDimensions: true
        }, {
          removeEditorsNSData: true
        }]
      };
    }))
    .on('error', $.util.log)
    .pipe($.svgstore())
    .pipe($.rename('svg-defs.html'))
    .pipe(gulp.dest('./_includes'));
};

gulp.task('build:svgs', icons);
