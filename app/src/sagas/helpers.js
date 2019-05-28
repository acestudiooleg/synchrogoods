import R from 'ramda';
import {put, select, call} from 'redux-saga/effects';

export const alert = (type, {message} = {}) =>
  put({type: 'driverapp/ALERT_SHOW', message, options: {type}});

export const loadingStart = () => put({type: 'driverapp/LOADING_START'});
export const loadingStop = () => put({type: 'driverapp/LOADING_STOP'});

export const transitionTo = path =>
  call(transitionToSaga, path);

export const transitionBack = () =>
  call(transitionBackSaga);

export const transitionReplace = path =>
  call(transitionReplaceSaga, path);

export const removeHash = () => window.location.hash.replace('#', '');

export function * transitionToSaga(path) {
  const router = yield select(R.prop('router'));
  if (!router || typeof router.history.push !== 'function') {
    return;
  }
  const currentPath = yield call(removeHash);

  if (currentPath !== path) {
    yield call(router.history.push, path);
  }
}

export function * transitionBackSaga() {
  const router = yield select(R.prop('router'));

  if (router && router.history && typeof router.history.goBack === 'function') {
    yield call(router.history.goBack);
  }
}

export function * transitionReplaceSaga(path) {
  const router = yield select(R.prop('router'));

  if (router && router.history && typeof router.history.replace === 'function') {
    yield call(router.history.replace, path);
  }
}
