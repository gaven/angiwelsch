import gulp from 'gulp';
import resize from 'gulp-image-resize';
import loadPlugins from 'gulp-load-plugins';

const $ = loadPlugins();

const images = () => {
  return gulp.src('./images/uploads/*')
    .pipe($.changed('./thumbs/small/images/uploads/'))
    .pipe(resize({
      height: 630
    }))
    .pipe(gulp.dest('./thumbs/small/images/uploads/'))
    .pipe($.changed('./thumbs/large/images/uploads/'))
    .pipe(resize({
      height: 1404
    }))
    .pipe(gulp.dest('./thumbs/large/images/uploads/'))
};

gulp.task('build:images', images);

export {images};
