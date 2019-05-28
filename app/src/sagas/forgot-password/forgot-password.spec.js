import test from 'ava';
import {saga, does, selects, throws} from 'test/helpers/saga';
import {take, put, call} from 'redux-saga/effects';
import {resetPassword} from 'src/libs/auth0/auth0';
import {alert} from '../helpers.js';

import forgotPassword from './forgot-password';

const email = 'ace@mail.com';

const store = {
  forgotPassword: {
    email
  }
};
const message = 'good';
const errorMessage = '__ERROR__';
const error = {original: new Error(errorMessage)};

test('successful reset password', saga(forgotPassword, [
  does(take('driverapp/RESET_PASSWORD')),
  selects(email, store),
  does(call(resetPassword, email), email),
  does(alert('info', {message}), message),
  does(put({type: 'driverapp/SHOW_MESSAGE'})),
  does(take('driverapp/RESET_PASSWORD'))
]));

test('with error reset password', saga(forgotPassword, [
  does(take('driverapp/RESET_PASSWORD')),
  selects(email, store),
  does(call(resetPassword, email), email),
  throws(does(alert('error', {message: errorMessage}), error)),
  does(take('driverapp/RESET_PASSWORD'))
]));
