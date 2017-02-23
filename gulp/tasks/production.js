import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import sequence from 'run-sequence';

const $ = loadPlugins();

const minifyHTML = () => {
  return gulp.src('./_site/**/*.html')
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./_site/'));
};

gulp.task('minifyHTML', minifyHTML);

const minifyCSS = () => {
  return gulp.src('./css/styles.css')
  .pipe($.cssnano())
  .pipe($.rename({extname: '.min.css'}))
  .pipe(gulp.dest('./_site/css'));
};

gulp.task('minifyCSS', minifyCSS);

const minifyJS = () => {
  return gulp.src('./scripts/app.js')
  .pipe($.uglify({onError: $.util.log}))
  .pipe($.rename({extname: '.min.js'}))
  .pipe(gulp.dest('./_site/scripts'));
};

gulp.task('minifyJS', minifyJS);

const production = done => {
  sequence('minifyCSS',
           'minifyJS',
           'minifyHTML',
           done
  );
};

gulp.task('build:production', production);
