import R from 'ramda';
import {take, select, put, call} from 'redux-saga/effects';
import {resetPassword} from 'src/libs/auth0/auth0';
import {alert} from '../helpers.js';
import {validateErrorsForAuth} from '../auth/auth';

export default function * ForgotPassword() {
  for (;;) {
    yield take('driverapp/RESET_PASSWORD');

    const email =
      yield select(R.path(['forgotPassword', 'email']));

    let res;

    try {
      res = yield call(resetPassword, email);
    } catch (err) {
      const message = validateErrorsForAuth(err);
      yield alert('error', {message});
      continue;
    }
    yield alert('info', {message: res});
    yield put({type: 'driverapp/SHOW_MESSAGE'});
  }
}
