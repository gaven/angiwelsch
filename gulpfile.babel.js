'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import group from 'gulp-group-css-media-queries';
import lost from 'lost';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import webpack from 'webpack-stream';
import changed from 'gulp-changed';
import resize from 'gulp-image-resize';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import path from 'path';
import cp from 'child_process';
import bs from 'browser-sync';

const reload = bs.reload;

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
  const stream = gulp
    .src('_app/styles/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['sass'],
      onError: gutil.log
    }))
    .pipe(postcss(plugins))
    .pipe(group())
    .pipe(rename({extname: '.css'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
  return stream;
};

gulp.task('build:styles', styles);

const scripts = () => {
  const stream = gulp
    .src('./_app/scripts/global.js')
    .pipe(webpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: { compact: false }
        }]
      }
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./scripts'));
  return stream;
};

gulp.task('build:scripts', scripts);

const images = {
  thumbs () {
    const stream = gulp.src('./images/uploads/*')
      .pipe(changed('./thumbs/small/images/uploads/'))
      .pipe(resize({
        height: 1200
      }))
      .pipe(gulp.dest('./thumbs/small/images/uploads/'));
    return stream;
  },

  images () {
    const stream = gulp.src('./images/uploads/*')
      .pipe(changed('./thumbs/large/images/uploads/'))
      .pipe(resize({
        height: 1404
      }))
      .pipe(gulp.dest('./thumbs/large/images/uploads/'));
    return stream;
  }
};

gulp.task('build:thumbs', images.thumbs);
gulp.task('build:images', images.images);

const icons = () => {
  const stream = gulp
    .src('./app/svgs/*.svg')
    .pipe(changed('./app/svgs/*.svg'))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgmin((file) => {
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
    .on('error', gutil.log)
    .pipe(svgstore())
    .pipe(rename('svg-defs.html'))
    .pipe(gulp.dest('./includes'));
  return stream;
};

gulp.task('build:svgs', icons);

const jekyll = (cb) => {
  cp.exec('jekyll build', (err) => {
    if (err) return cb(err);
    cb();
  });
};

gulp.task('build:jekyll', jekyll);

gulp.task('serve', () => {
  bs({
    server: '_site',
    ghostMode: {
      clicks: true,
      forms: true
    },
    open: false
  });
});

gulp.task('reload', ['build:jekyll'], () => {
  reload();
});

gulp.task('build:production', (cb) => {
  styles();
  scripts();
  images.thumbs();
  images.images();
  icons();
  cb();
});

gulp.task('watch', ['serve'], () => {
  gulp.watch(['**/*.html', '**/*.md', '**/*.yml', '!_site/**/*.*', './css/*.css', './scripts/*.js'], ['reload']);
  gulp.watch(['./_app/styles/**/*.scss'], ['build:styles']);
  gulp.watch(['./_app/scripts/**/*.js'], ['build:scripts']);
  gulp.watch(['./_app/svgs/*.svg'], ['build:icons']);
});

gulp.task('default', ['watch']);

