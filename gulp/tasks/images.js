import gulp from 'gulp';
import resize from 'gulp-image-resize';
import loadPlugins from 'gulp-load-plugins';

const $ = loadPlugins();

const images = () => {
  return gulp.src('./images/uploads/*')
    .pipe(resize({
      height: 630,
      crop: false,
      upscale: false,
      quality: 0.8
    }))
    .pipe(gulp.dest('./thumbs/small/images/uploads/'))
    .pipe(resize({
      height: 1304,
      crop: false,
      upscale: false,
      quality: 0.8
    }))
    .pipe(gulp.dest('./thumbs/large/images/uploads/'))
};

gulp.task('build:images', images);
