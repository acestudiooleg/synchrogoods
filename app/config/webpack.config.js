/* eslint indent: 0 */
const webpack = require('webpack');
const R = require('ramda');
const {devServer} = require('../package.json');
const meta = require('./webpack.meta');

const envToggle = (dev, prod) =>
  /^development/.test(process.env.NODE_ENV) ? dev : prod;

const index = env => process.env.NODE_ENV === `${env}:mobile` ?
  ['./src/index.mobile.html'] :
  ['./src/index.web.html'];

module.exports = process.env.NODE_ENV ?
  R.merge(meta, {
    devtool: envToggle('eval', 'cheap-source-map'),
    entry: envToggle(
      // DEVELOPMENT
      meta.entry({
        prepend: [
          `webpack-dev-server/client?http://${
            process.env.NODE_ENV === 'development:mobile' ?
              process.env.REMOTE_HOST || '192.168.0.106' :
              devServer.hostname
          }:${devServer.port}`,
          'webpack/hot/only-dev-server'
        ],
        append: index('development')
      }),
      // PRODUCTION
      meta.entry({
        append: index('production')
      })
    ),
    plugins: envToggle(
      // DEVELOPMENT
      meta.plugins({
        prepend: [
          new webpack.HotModuleReplacementPlugin()
        ]
      }),
      // PRODUCTION
      meta.plugins({
        prepend: [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          })
        ]
      })
    ),
    module: envToggle(
      // DEVELOPMENT
      meta.module({
      }),
      // PRODUCTION
      meta.module({})
    )
  }) :
  // special for storybook
{
  module: meta.module({}),
  postcss: meta.postcss,
  resolve: meta.resolve
};
