#! /usr/bin/env node
const url = require('url');
const cp = require('child_process');
const R = require('ramda');
const {Promise, coroutine, promisifyAll} = require('bluebird');
const replace = require('replace');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const {identity: I} = R;

const config = require('./config/webpack.config');
const {devServer} = require('./package.json');

const [,, target = 'emulator'] = process.argv;

const host = process.env.REMOTE_HOST || '10.0.2.2';

const src = (hostname = devServer.hostname) => url.format(R.merge(
  {protocol: 'http:'},
  R.set(R.lensProp('hostname'), hostname, devServer)
));

const defaultContentTag = '<content src="index.html" />';
const contentTag = `<content src="${src(host)}" />`;

promisifyAll(WebpackDevServer.prototype);

const spawn = (command, stdout = I, stderr = I, hooks = I) =>
  new Promise((resolve, reject) => {
    const listener = cb => R.pipe(R.toString, R.trim, hooks, cb);
    const child = cp.spawn(R.head(command), R.tail(command));
    child.stdout.on('data', listener(stdout));
    child.stderr.on('data', listener(stderr));
    child.on('close', code => code ? reject(code) : resolve(code));
  });

const updateConfig = (x, y) => replace({
  regex: x,
  replacement: R.replace('\\', '', y),
  paths: ['config.xml'],
  silent: true
});

const cleanUp = () => {
  console.info('Cleaning up');
  updateConfig(contentTag, defaultContentTag);
};

const terminate = err => {
  console.error(err);
  cleanUp();
  process.exit(1);
};

process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);

(coroutine(function * () {
  yield new Promise((resolve, reject) => {
    try {
      const compiler = webpack(config);
      compiler.plugin('done', resolve);
      new WebpackDevServer(compiler, {
        contentBase: './platforms/android/assets/www',
        publicPath: '/',
        hot: true,
        historyApiFallback: true
      }).listen(devServer.port, devServer.hostname);
    } catch (err) {
      reject(err);
    }
  });
  console.info(`Listening at ${src()}`);

  if (process.env.NODE_ENV !== 'development:mobile') {
    return;
  }

  console.info(`Initializing android ${target}`);
  updateConfig(defaultContentTag, contentTag);

  yield spawn(['cordova', 'run', `--${target}`], console.log, terminate, R.when(
    R.equals(`${target === 'emulator' ? 'INSTALL' : 'LAUNCH'} SUCCESS`),
      cleanUp)
  );
}))().catch(terminate);
