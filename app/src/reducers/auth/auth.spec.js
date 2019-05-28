import test from 'ava';

import auth, {initialState} from './auth';

test('initial state', t => t.deepEqual(
  auth(undefined, {type: undefined}),
  initialState
));

test('login', t => {
  const authPair = {a: 1, b: 2};

  t.deepEqual(auth(undefined, {type: 'driverapp/LOGIN'}), {
    ...initialState,
    authPair: {}
  });

  t.deepEqual(auth(undefined, {type: 'driverapp/LOGIN', authPair}), {
    ...initialState,
    authPair
  });
});

test('unauthorize', t => t.deepEqual(
  auth({...initialState, authorized: true}, {type: 'driverapp/UNAUTHORIZE'}),
  initialState
));

test('authorize', t => {
  const authObject = {a: 1};

  t.deepEqual(auth(undefined, {type: 'driverapp/AUTHORIZE', authObject}), {
    ...initialState,
    authorized: true,
    authObject
  });

  t.deepEqual(
    auth({
      ...initialState,
      authorized: false
    }, {type: 'driverapp/AUTHORIZE'}), {
      ...initialState,
      authorized: true
    }
  );
});
