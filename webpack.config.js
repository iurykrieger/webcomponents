const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js',
      './src/index.js'
    ],
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, './theme/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules\/@webcomponents/],
        loader: 'babel-loader',
      },
      {
        test: /\.ejs$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
  ],
};
