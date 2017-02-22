import gulp from 'gulp';
import resize from 'gulp-image-resize';
import loadPlugins from 'gulp-load-plugins';

const $ = loadPlugins();

const images = {
  thumbs () {
    const stream = gulp.src('./images/uploads/*')
      .pipe($.changed('./thumbs/small/images/uploads/'))
      .pipe(resize({
        height: 630
      }))
      .pipe(gulp.dest('./thumbs/small/images/uploads/'));
    return stream;
  },

  images () {
    const stream = gulp.src('./images/uploads/*')
    .pipe($.changed('./thumbs/large/images/uploads/'))
    .pipe(resize({
      height: 1404
    }))
    .pipe(gulp.dest('./thumbs/large/images/uploads/'));
    return stream;
  }
};

gulp.task('build:thumbs', images.thumbs);
gulp.task('build:images', images.images);
