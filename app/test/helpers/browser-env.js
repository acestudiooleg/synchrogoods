const os = require('os');
const path = require('path');
const uuid = require('node-uuid');
const LocalStorage = require('node-localstorage').LocalStorage;

require('babel-polyfill');

const jsdom = require('jsdom');

global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;

Object.keys(window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

global.window.google = {};
global.Camera = {
  DestinationType: {
    DATA_URL: 'DATA_URL'
  },
  PictureSourceType: {
    CAMERA: 'CAMERA'
  }
};

global.navigator = {
  userAgent: 'node.js',
  camera: {
    getPicture: () => {}
  }
};

global.L = require('leaflet');

global.localStorage = new LocalStorage(path.resolve(os.tmpdir(), uuid.v4()));

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);

global.rootElement = rootElement;

// disable react warnings
const error = console.error;
console.error = warning =>
  /^Warning/.test(warning) || error.call(console, warning);
