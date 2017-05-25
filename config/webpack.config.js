const path = require('path');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
const ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

module.exports = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.js$/,
        loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    // new OfflinePlugin({
    //   caches: {
    //     main: [
    //       './build/main.js',
    //       './build/main.css',
    //       './build/polyfills.js',
    //       'index.html'
    //     ],
    //     additional: [
    //       './assets/icon/favicon.ico',
    //       './assets/imgs/logo.png',
    //       'manifest.json'
    //     ],
    //     optional: [
    //       './assets/fonts/*'
    //     ]
    //   },
    //   publicPath: '',
    //   responseStrategy: 'cache-first',
    //   ServiceWorker: {
    //     events: true
    //   },
    //   AppCache: {
    //     events: true
    //   }
    // })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
