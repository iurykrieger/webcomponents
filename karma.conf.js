const webpackConfig = require('./webpack.config');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      './node_modules/promise-polyfills/promise.js',
      './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js',
      './test/unit/**/*.spec.js',
    ],
    exclude: [],
    preprocessors: {
      './test/unit/**/*.spec.js': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: true,
    concurrency: Infinity,
  });
};
