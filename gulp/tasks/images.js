import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const $ = loadPlugins();

const images = () => {
  return gulp.src('./_app/images/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('./images'));
}

gulp.task('build:images', images);
