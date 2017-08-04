'use strict';

const reload = bs.reload;
import autoprefixer from 'autoprefixer';
import bs from 'browser-sync';
import changed from 'gulp-changed';
import cp from 'child_process';
import cssmin from 'gulp-clean-css';
import group from 'gulp-group-css-media-queries';
import gulp from 'gulp';
import gutil from 'gulp-util';
import htmlmin from 'gulp-htmlmin';
import lost from 'lost';
import path from 'path';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import resize from 'gulp-image-resize';
import runsequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import webpack from 'webpack-stream';

const ENV = process.env.npm_lifecycle_event;
const PROD =  ENV === 'production';

const supported = [
  '> 1%',
  'last 2 versions',
  'IE >= 9'
];

const plugins = [
  autoprefixer(supported),
  lost()
];

gulp.task('build:styles', (cb) => {
  gulp.src('_app/styles/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['sass'],
      onError: gutil.log
    }))
    .pipe(postcss(plugins))
    .pipe(group())
    .pipe(rename({
      extname: '.css'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
  cb();
});

gulp.task('build:scripts', (cb) => {
  gulp.src('./_app/scripts/global.js')
    .pipe(webpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            compact: false
          }
        }]
      }
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./scripts'));
  cb();
});

gulp.task('build:thumbs', (cb) => {
  gulp.src('./images/uploads/*')
    .pipe(changed('./thumbs/small/images/uploads/'))
    .pipe(resize({
      height: 1200
    }))
    .pipe(gulp.dest('./thumbs/small/images/uploads/'));
  cb();
});

gulp.task('build:images', (cb) => {
  gulp.src('./images/uploads/*')
    .pipe(changed('./thumbs/large/images/uploads/'))
    .pipe(resize({
      height: 1404
    }))
    .pipe(gulp.dest('./thumbs/large/images/uploads/'));
  cb();
});

gulp.task('build:minifyHTML', (cb) => {
  gulp.src('./_site/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./_site/./'));
  cb();
});

gulp.task('build:minifyCSS', (cb) => {
  gulp.src('./css/styles.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}));
  cb();
});

gulp.task('build:move', (cb) => {
  gulp.src('./thumbs/**/*')
  .pipe(gulp.dest('./_site/'));
  cb();
});

const icons = () => {
  gulp.src('./app/svgs/*.svg')
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
};

gulp.task('build:svgs', icons);

const jekyll = (cb) => {
  let command = 'jekyll build';

  if (PROD) {
    command = 'JEKYLL_ENV=production jekyll build';
  }
  cp.exec(command, (err) => {
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

gulp.task('build:production', ['build:thumbs', 'build:images'], (cb) => {
  runsequence('build:styles', 'build:scripts', 'build:minifyCSS', 'build:jekyll', 'build:minifyHTML', cb);
});

gulp.task('watch', ['serve'], () => {
  gulp.watch(['**/*.html', '**/*.md', '**/*.yml', '!_site/**/*.*', './css/*.css', './scripts/*.js'], ['reload']);
  gulp.watch(['./_app/styles/**/*.scss'], ['build:styles']);
  gulp.watch(['./_app/scripts/**/*.js'], ['build:scripts']);
  gulp.watch(['./_app/svgs/*.svg'], ['build:icons']);
});

gulp.task('default', ['watch']);

