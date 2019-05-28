import R from 'ramda';
import {signIn, verifyToken} from 'src/libs/auth0/auth0';
import trash from 'src/sagas/trash/trash';
import {take, select, call, put} from 'redux-saga/effects';
import {setItem, getItem, clear, valueOf}
  from 'src/libs/localstorage/localstorage';
import {alert, loadingStart, loadingStop, transitionTo} from '../helpers';

export const errorMessageOnLogin =
  'Unable to login. Please check your email and password.';
export const driverNotSetup =
  'This account has not been setup to be used as a driver. ' +
  'Please contact your dispatcher or system administrator';

export const authErrors = {
  'Not Found': driverNotSetup,
  'Wrong email or password.': errorMessageOnLogin,
  'invalid_user_password': errorMessageOnLogin,
  'invalid_password': errorMessageOnLogin
};

export const validateErrorsForAuth = error =>
  authErrors[R.path(['description', 'description'], error)] ||
  authErrors[R.path(['description'], error)] ||
  authErrors[R.path(['code'], error)] ||
  authErrors[R.path(['message'], error)] ||
  R.path(['description', 'description'], error) ||
  (typeof R.path(['description'], error) === 'string' && R.path(['description'], error)) ||
  R.path(['code'], error) ||
  R.path(['original', 'message'], error);

export function * handleError(err) {
  const errorMessage = yield call(validateErrorsForAuth, err);
  yield alert('error', {message: errorMessage});
  yield * unauthorize();
}

function * store(method, authObject) {
  for (const key in authObject) {
    /* istanbul ignore else  */
    if ({}.hasOwnProperty.call(authObject, key)) {
      yield call(method, key, authObject[key]);
    }
  }
}

export const getDriver = username =>
  trash(
    'view-driver-by-username',
    {path: {username}}
  );

export function * authorize(authObject) {
  if (authObject) {
    yield * store(setItem, authObject);
    yield call(setItem, 'lastUsername', authObject.email);
  } else {
    authObject = yield call(valueOf);
  }
  const {body: driver} = yield call(getDriver(authObject.email));
  yield put({type: 'driverapp/DRIVER_RECEIVE', driver});
  yield put({type: 'driverapp/AUTHORIZE', authObject});
}

function * unauthorize() {
  yield put({type: 'driverapp/UNAUTHORIZE'});
  const lastUsername = yield call(getItem, 'lastUsername');
  yield call(clear);
  if (lastUsername) {
    yield call(setItem, 'lastUsername', lastUsername);
  }
}

function * logout() {
  yield take('driverapp/LOGOUT');
  yield * unauthorize();
  yield transitionTo('/');
}

function * login() {
  for (;;) {
    yield take('driverapp/LOGIN');
    const {authUser, authPass} =
      yield select(R.path(['auth', 'authPair']));
    try {
      yield loadingStart();
      const authObject =
        yield call(signIn, authUser, authPass);
      yield * authorize({
        authUser: authObject.idTokenPayload.name,
        email: authObject.idTokenPayload.email,
        idToken: authObject.idToken
      });
      yield loadingStop();
      yield * logout();
    } catch (err) {
      yield * handleError(err);
      yield loadingStop();
    }
  }
}

export default function * auth() {
  const idToken = yield call(getItem, 'idToken');
  try {
    if (idToken) {
      const isValid = yield call(verifyToken, idToken);
      if (isValid) {
        yield * authorize();
        yield * logout();
      } else {
        yield * unauthorize();
      }
    }
  } catch (err) {
    yield * handleError(err);
  } finally {
    yield * login();
  }
}
