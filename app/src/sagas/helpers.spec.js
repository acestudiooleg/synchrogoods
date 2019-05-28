import test from 'ava';
import {saga, does, ends, selects} from 'test/helpers/saga';
import {put, call} from 'redux-saga/effects';

import {alert, loadingStart, loadingStop, transitionTo, transitionToSaga,
  removeHash, transitionBack, transitionBackSaga, transitionReplace,
  transitionReplaceSaga} from './helpers';

test('alert', t => {
  const errMsg = '__ERROR_MESSAGE__';
  t.deepEqual(alert('error', new Error(errMsg)), put({
    type: 'driverapp/ALERT_SHOW',
    message: errMsg,
    options: {type: 'error'}
  }));
});

test('alert with undefined err', t => {
  t.deepEqual(alert('error'), put({
    type: 'driverapp/ALERT_SHOW',
    message: undefined,
    options: {type: 'error'}
  }));
});

test('loading start', t =>
  t.deepEqual(loadingStart(), put({type: 'driverapp/LOADING_START'}))
);

test('loading stop', t =>
  t.deepEqual(loadingStop(), put({type: 'driverapp/LOADING_STOP'}))
);

test('transition to', t => {
  t.deepEqual(transitionTo('/address'), call(transitionToSaga, '/address'));
});

test('DRIV-399 transition replace', t => {
  t.deepEqual(transitionReplace('/address'), call(transitionReplaceSaga, '/address'));
});

test('transition back', t => {
  t.deepEqual(transitionBack(), call(transitionBackSaga));
});

const router = {history: {push: () => {}, goBack: () => {}, replace: () => {}}};
const path = '__PATH__';

test(`transitionTo saga
      calls transitionTo if there is a router`,
  saga(transitionToSaga, [
    selects(router, {router}),
    does(call(removeHash), router),
    does(call(router.history.push, path), '#poiu')
  ], path)
);

test(`transitionTo saga
      does nothing if there is no a router in the state`,
  saga(transitionToSaga, [
    selects(null, {router: null}),
    ends(null)
  ], path)
);

test(`transitionTo saga
      calls transitionTo current path equals to needed`,
  saga(transitionToSaga, [
    selects(router, {router}),
    does(call(removeHash), router),
    does(undefined, path)
  ], path)
);

test(`transitionBack saga
      does nothing if there is no a router in the state`,
  saga(transitionBackSaga, [
    selects(null, {router: null}),
    ends(null)
  ])
);

test(`DRIV-399 transitionReplace saga
      does nothing if there is no a router in the state`,
  saga(transitionReplaceSaga, [
    selects(null, {router: null}),
    ends(null)
  ])
);

test(`DRIV-399 transitionReplace saga
      calls transitionReplace current path equals to needed`,
  saga(transitionReplaceSaga, [
    selects(router, {router}),
    does(call(router.history.replace, path), router, '#poiu')
  ], path)
);

test('DRIV-344 transitionBack saga calls goBack if there is ' +
  'a router and router.history is set', saga(transitionBackSaga, [
    selects(router, {router}),
    does(call(router.history.goBack), router),
    does(undefined)
  ]));

test('removeHash', t => {
  window.location.hash = '#/';
  t.is(removeHash(), '/');
});
