const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const gulpWebpack = require('webpack-stream');
const karma = require('karma');
const path = require('path');
const pump = require('pump');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const $ = gulpLoadPlugins();

const config = {
  vhostPath: '/var/www/static',
};

gulp.task('lint', cb => pump([
  gulp.src(['./src/**/*.js']),
  $.eslint(),
  $.eslint.format(),
  $.eslint.failAfterError(),
], cb));

gulp.task('js', cb => pump([
  gulpWebpack(
    Object.assign(
      webpackConfig,
      { mode: 'development' },
    ),
    webpack,
  ),
  gulp.dest('./dist'),
  gulp.dest(config.vhostPath),
], cb));

gulp.task('test:local', (done) => {
  new karma.Server({
    configFile: path.resolve(__dirname, './karma.conf.js'),
    singleRun: false,
  }, done).start();
});

gulp.task('test:ci', (done) => {
  new karma.Server({
    configFile: path.resolve(__dirname, './karma.conf.js'),
  }, done).start();
});
