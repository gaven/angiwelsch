import cp from 'child_process';
import browsersync from 'browser-sync';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const reload = browsersync.reload;
const $ = loadPlugins();

const minifyHTML = () => {
  return gulp.src('./_site/**/*.html')
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./_site/'))
    .pipe(reload({stream: true}));
};

const minifyCSS = () => {
  return gulp.src('./css/styles.css')
  .pipe($.cssnano())
  .pipe($.rename({extname: '.min.css'}))
  .pipe(gulp.dest('./css'));
};

const minifyJS = () => {
  return gulp.src('./scripts/app.js')
  .pipe($.uglify({onError: $.util.log}))
  .pipe($.rename({extname: '.min.js'}))
  .pipe(gulp.dest('./scripts'));
};

const minifyAssets = () => {
  minifyHTML();
  minifyCSS();
  minifyJS();
};

gulp.task('build:minify', minifyAssets);

const jekyllProduction = (done) => {
  const productionEnv = process.env;
  productionEnv.JEKYLL_ENV = 'production';

  return cp.spawn('jekyll', ['build'], {
    stdio: 'inherit',
    env: productionEnv
  })
  .on('close', done);
};

gulp.task('build:production', ['build:minify'], jekyllProduction);
