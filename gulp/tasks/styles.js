import autoprefixer from 'autoprefixer';
import browsersync from 'browser-sync';
import group from 'gulp-group-css-media-queries';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import lost from 'lost';
import runSequence from 'run-sequence';

const reload = browsersync.reload;
const $ = loadPlugins();

const supported = [
  '> 1%',
  'last 2 versions',
  'IE >= 9'
];

const plugins = [
  autoprefixer(supported),
  lost()
];

const styles = () => {
  return gulp.src('_app/styles/styles.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['sass'],
      onError: $.util.log
    }))
    .pipe($.postcss(plugins))
    .pipe(group())
    .pipe($.rename({extname: '.css'}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream: true}));
};

const reloadStyles = (done) => {
  runSequence('build:styles', 'build:reload', () => {
    done();
  });
};

gulp.task('build:styles', styles);
gulp.task('watch:styles', reloadStyles);
