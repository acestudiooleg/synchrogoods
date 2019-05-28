import test from 'ava';
import sinon from 'sinon';

import setWakeLock, {wakeLockErr} from './wake-lock';

const console = {};
const cordova = {};
cordova.plugins = {};
cordova.plugins.backgroundMode = {};

test('DRIV-409 should turn on backgroundMode', t => {
  const setEnabled = sinon.spy();

  cordova.plugins.backgroundMode.setEnabled = setEnabled;
  window.cordova = cordova;

  setWakeLock(true);
  t.truthy(setEnabled.calledWith(true));
});

test('DRIV-409 should turn off backgroundMode', t => {
  const setEnabled = sinon.spy();

  cordova.plugins.backgroundMode.setEnabled = setEnabled;
  window.cordova = cordova;

  setWakeLock(false);
  t.truthy(setEnabled.calledWith(false));
});

test('DRIV-409 should catch wake lock plugin errors', t => {
  const setEnabled = sinon.stub().throws();
  const outputError = sinon.spy();

  cordova.plugins.backgroundMode.setEnabled = setEnabled;
  console.error = outputError;
  window.cordova = cordova;
  window.console = console;

  setWakeLock(false);
  t.truthy(outputError.calledWith(wakeLockErr));
});
