import cp from 'child_process';
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
  .pipe(gulp.dest('./css'));
};

gulp.task('minifyCSS', minifyCSS);

const minifyJS = () => {
  return gulp.src('./scripts/app.js')
  .pipe($.uglify({onError: $.util.log}))
  .pipe($.rename({extname: '.min.js'}))
  .pipe(gulp.dest('./scripts'));
};

gulp.task('minifyJS', minifyJS);

const jekyllProd = done => {
  const productionEnv = process.env;
  productionEnv.JEKYLL_ENV = 'production';

  return cp.spawn('jekyll', ['build'], {
    stdio: 'inherit',
    env: productionEnv
  })
  .on('close', done);
};

gulp.task('jekyllProd', jekyllProd);

const production = done => {
  sequence('minifyCSS',
           'minifyJS',
           'build:images',
           'jekyllProd',
           'minifyHTML',
           done
  );
};

gulp.task('build:production', production);
