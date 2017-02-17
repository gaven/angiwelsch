import gulp from 'gulp';
import resize from 'gulp-image-resize';
import loadPlugins from 'gulp-load-plugins';

const $ = loadPlugins();

const images = {
  smallImages () {
    return gulp.src('./images/uploads/*')
      .pipe($.changed('./thumbs/small/images/uploads/'))
      .pipe(resize({
        height: 630
      }))
      .pipe(gulp.dest('./thumbs/small/images/uploads/'));
  },

  largeImages () {
    return gulp.src('./images/uploads/*')
    .pipe($.changed('./thumbs/large/images/uploads/'))
    .pipe(resize({
      height: 1404
    }))
    .pipe(gulp.dest('./thumbs/large/images/uploads/'));
  }
};

const buildImages = () => {
  images.smallImages();
  images.largeImages();
};

gulp.task('build:images', buildImages);

export { images };
