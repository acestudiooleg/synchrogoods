const path = require('path');
const webpack = require('webpack');
const R = require('ramda');
const S = require('sanctuary');

const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssColorFunction = require('postcss-color-function');
const postcssCalc = require('postcss-calc');
const autoprefixer = require('autoprefixer');
const lost = require('lost');

const extendableListRule = R.curry((rule, enhancers) => {
  if (!enhancers) {
    return rule;
  }
  /* eslint babel/new-cap: 0 */
  /* eslint new-cap: 0 */
  return S.B(
    R.concat(enhancers.prepend || []),
    R.concat(R.__, enhancers.append || []),
    rule
  );
});

const projDir = dirName => path.resolve(path.join(__dirname, '..', dirName));

module.exports = {
  entry: extendableListRule([
    'babel-polyfill',
    './src/app.js'
  ]),
  output: {
    path: projDir('www'),
    filename: 'script.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['.', 'node_modules']
  },
  plugins: extendableListRule([
    new webpack.ProvidePlugin({
      Promise: 'bluebird'
    })
  ]),
  module: loaders => ({
    loaders: [
      {
        test: /\.js$/,
        loaders: extendableListRule(['babel'], loaders.js),
        exclude: projDir('node_modules')
      },
      {
        test: /\.json$/,
        loaders: extendableListRule(['json'], loaders.json)
      },
      {
        test: /\.html$/,
        loaders: extendableListRule(['file?name=index.html'], loaders.html)
      },
      {
        test: /\.css$/,
        loaders: extendableListRule([
          'style',
          'css?modules&importLoaders=1',
          'postcss'
        ], loaders.css)
      },
      {
        test: /(\.woff|\.svg|\.ttf|\.eot|\.png|\.jpg)$/,
        loaders: extendableListRule(['file'], loaders.file)
      }
    ]
  }),
  postcss: webpack => [
    postcssImport({addDependencyTo: webpack}),
    autoprefixer,
    postcssMixins,
    postcssNested,
    postcssSimpleVars,
    postcssColorFunction,
    postcssCalc,
    autoprefixer({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ]
    }),
    lost
  ]
};
