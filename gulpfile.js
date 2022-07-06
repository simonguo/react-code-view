const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const gulp = require('gulp');
const STYLE_SOURCE_DIR = './src/less';
const STYLE_DIST_DIR = './dist/styles';

function buildLess() {
  return gulp
    .src([`${STYLE_SOURCE_DIR}/*.less`])
    .pipe(sourcemaps.init())
    .pipe(less({ javascriptEnabled: true, paths: ['*.css', '*.less'] }))
    .pipe(postcss([require('autoprefixer')]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename('react-code-view.css'))
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`));
}

function buildCSS() {
  return gulp
    .src(`${STYLE_DIST_DIR}/react-code-view.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`));
}

function copyLessFiles() {
  return gulp.src([`${STYLE_SOURCE_DIR}/*.less`]).pipe(gulp.dest(STYLE_DIST_DIR));
}

function copyDocs() {
  return gulp
    .src(['./README.md', './CHANGELOG.md', './LICENSE', 'package.json'])
    .pipe(gulp.dest('dist'));
}

function copyLoader() {
  return gulp.src(['./webpack-md-loader/*']).pipe(gulp.dest('dist/webpack-md-loader'));
}

exports.build = gulp.series(buildLess, buildCSS, copyLessFiles, copyDocs, copyLoader);
