const path = require('path');
const webpack = require('webpack');
const R = require('ramda');
const S = require('sanctuary');

const extendableListRule = R.curry((rule, enhancers) => {
  if (!enhancers) {
    return rule;
  }
  /* eslint babel/new-cap: 0 */
  /* eslint new-cap: 0 */
  return S.compose(R.concat(enhancers.prepend || []))(
    R.concat(R.__, enhancers.append || []),
  )(rule);
});

const projDir = dirName => path.resolve(path.join(__dirname, '..', dirName));

module.exports = {
  entry: extendableListRule(['babel-polyfill', './src/index.js']),
  output: {
    path: projDir('www'),
    filename: 'script.js',
    publicPath: '',
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['.', 'node_modules'],
  },
  plugins: extendableListRule([
    new webpack.ProvidePlugin({
      Promise: 'bluebird',
    }),
  ]),
  module: loaders => ({
    loaders: [
      {
        test: /\.js$/,
        loaders: extendableListRule(['babel'], loaders.js),
        exclude: projDir('node_modules'),
      },
      {
        test: /\.json$/,
        loaders: extendableListRule(['json'], loaders.json),
      },
      {
        test: /\.html$/,
        loaders: extendableListRule(['file?name=index.html'], loaders.html),
      },
      {
        test: /(\.woff|\.svg|\.ttf|\.eot|\.png|\.jpg)$/,
        loaders: extendableListRule(['file'], loaders.file),
      },
    ],
  }),
};
