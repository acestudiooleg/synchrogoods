
import test from 'ava';
import {saga, does, selects, throws, requests} from 'test/helpers/saga';
import {signIn, verifyToken} from 'src/libs/auth0/auth0';
import {take, call, put} from 'redux-saga/effects';
import {setItem, getItem, clear, valueOf}
  from 'src/libs/localstorage/localstorage';
import {alert, loadingStart, loadingStop, transitionTo} from '../helpers';
import auth, {
  errorMessageOnLogin,
  driverNotSetup,
  authErrors,
  handleError,
  validateErrorsForAuth,
  getDriver,
  authorize
} from './auth';

const notFoundErrMessage = 'Not Found';
const wrongCredentialsErrMessage = 'Wrong email or password.';
const unknownErrMessage = 'Unknown Error';
const invalidUserDataErrMessage = 'invalid_user_password';
const invalidaPasswordErrMessage = 'invalid_password';
const errorAsCode = code => ({code});
const errorAsDescription = description => ({description: {description}});
/* eslint camelcase: 0 */
const errorAsErrorDescription = description => ({code: 'invalid_grant', description});

const authErr = errorAsDescription(errorMessageOnLogin);
const unknownErr = errorAsDescription(unknownErrMessage);
const notFoundErr = errorAsCode(notFoundErrMessage);
const wrongCredentialsErr = errorAsCode(wrongCredentialsErrMessage);
const invalidUserDataErr = errorAsErrorDescription(invalidUserDataErrMessage);
const invalidaPasswordErr = errorAsCode(invalidaPasswordErrMessage);
const timeoutError = {original: {crossDomain: true, method: 'POST',
  url: 'https://test-shitty-search.eu.auth0.com/oauth/token',
  message: 'Request has been terminated\n' +
  'Possible causes: the network is offline, Origin' +
  ' is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.'},
  code: null, description: null, name: 'Error'};

const authObject = {
  idTokenPayload: {
    name: 'name', email: 'dfg@mail.com'
  },
  idToken: 1
};

const driver = {};

const authPair = {authUser: 'name', authPass: 1};

const authObjectToLS = {
  authUser: authObject.idTokenPayload.name,
  email: authObject.idTokenPayload.email,
  idToken: authObject.idToken
};

const processKeys = method => Object.keys(authObjectToLS).map(key =>
  does(call(method, key, authObjectToLS[key]), authObject)
);

const getToken = does(call(getItem, 'idToken'));

const unauthorize = prevVal => [
  does(put({type: 'driverapp/UNAUTHORIZE'}), prevVal),
  does(call(getItem, 'lastUsername')),
  does(call(clear), authObjectToLS.email),
  does(call(setItem, 'lastUsername', authObjectToLS.email))
];

const unauthorizeNoLastUsername = prevVal => [
  does(put({type: 'driverapp/UNAUTHORIZE'}), prevVal),
  does(call(getItem, 'lastUsername')),
  does(call(clear), null)
];

const logout = [
  does(take('driverapp/LOGOUT')),

  ...unauthorize(),
  does(transitionTo('/'))
];

const getAndSaveDriver = authObject => [
  requests(getDriver(authObject.email), authObject),
  does(put({type: 'driverapp/DRIVER_RECEIVE', driver}), {body: driver})
];

const loginBegin = (
  prevVal,
  authUser = authPair.authUser,
  authPass = authPair.authPass
) => [
  does(take('driverapp/LOGIN'), prevVal),

  selects(authPair, {auth: {authPair}}),
  does(loadingStart(), {authUser, authPass}),
  does(call(signIn, authUser, authPass))

];
const login = prevVal => [
  ...loginBegin(prevVal),

  ...processKeys(setItem),
  does(call(setItem, 'lastUsername', authObjectToLS.email)),

  ...getAndSaveDriver(authObjectToLS),

  does(put({type: 'driverapp/AUTHORIZE', authObject: authObjectToLS})),
  does(loadingStop()),

  ...logout,

  does(take('driverapp/LOGIN'))
];

test(`user was not authorized
      and they try to login with right credentials`,
  saga(auth, [
    getToken,
    ...login(null)
  ])
);

test('server sent error on driver request',
  saga(() => authorize(authObjectToLS), [
    ...processKeys(setItem),
    does(call(setItem, 'lastUsername', authObjectToLS.email)),
    requests(getDriver(authObjectToLS.email))
  ]));

test(`user was authorized before, however his session was expired,
      and they try to login with right credentials again`,
  saga(auth, [
    getToken,
    does(call(verifyToken, authObject.idToken), authObject.idToken),

    ...unauthorize(false),

    ...login()
  ])
);

test('user was authorized before and their session still valid', saga(auth, [
  getToken,

  does(call(verifyToken, authObject.idToken), authObject.idToken),

  does(call(valueOf), true),

  ...getAndSaveDriver(authObject),

  does(put({type: 'driverapp/AUTHORIZE', authObject})),

  ...logout,

  ...login()
]));

test('DRIV-383 user was authorized before and ' +
  'their session still valid, but getDriver times out', saga(auth, [
    getToken,

    does(call(verifyToken, authObject.idToken), authObject.idToken),

    does(call(valueOf), true),

    requests(getDriver(authObjectToLS.email), authObjectToLS),
    throws(does(call(validateErrorsForAuth, notFoundErr), notFoundErr)),
    does(alert('error', {message: 'Timeout Error'}), 'Timeout Error'),
    ...unauthorize()

  ]));

test(`user was not authorized before
      and tries to login with wrong credentials full login`,
  saga(auth, [
    getToken,
    ...loginBegin(null, 'wrongUsername', 'wrongPassword'),
    throws(does(call(validateErrorsForAuth, authErr), authErr)),
    does(alert('error', {message: errorMessageOnLogin}), errorMessageOnLogin),
    ...unauthorize(),
    does(loadingStop()),
    ...login()
  ])
);

test(`user was not authorized before
      and tries to login with wrong credentials`,
  saga(auth, [
    getToken,
    ...loginBegin(null, 'wrongUsername', 'wrongPassword'),
    throws(does(call(validateErrorsForAuth, authErr), authErr)),
    does(alert('error', {message: validateErrorsForAuth(authErr)}),
      validateErrorsForAuth(authErr)),
    ...unauthorize(),
    does(loadingStop()),
    ...loginBegin(null)
  ])
);

test('DRIV-383 - getDriver return Not Found error (404)',
  saga(auth, [
    getToken,
    ...loginBegin(null),
    ...processKeys(setItem),
    does(call(setItem, 'lastUsername', authObjectToLS.email)),
    requests(getDriver(authObjectToLS.email), authObjectToLS),
    throws(does(call(validateErrorsForAuth, notFoundErr), notFoundErr)),
    does(
      alert('error', {message: driverNotSetup}),
      authErrors[notFoundErrMessage]
    ),
    ...unauthorize(),
    does(loadingStop())
  ])
);

test('DRIV-383 - getDriver return Not Found error (404) Invariant -- no last username',
  saga(auth, [
    getToken,
    ...loginBegin(null),
    ...processKeys(setItem),
    does(call(setItem, 'lastUsername', authObjectToLS.email)),
    requests(getDriver(authObjectToLS.email), authObjectToLS),
    throws(does(call(validateErrorsForAuth, notFoundErr), notFoundErr)),
    does(
      alert('error', {message: driverNotSetup}),
      authErrors[notFoundErrMessage]
    ),
    ...unauthorizeNoLastUsername(),
    does(loadingStop())
  ])
);

test('DRIV-383 - getDriver return Unauthorized error (401)',
  saga(auth, [
    getToken,
    ...loginBegin(null),
    throws(does(
      call(validateErrorsForAuth, wrongCredentialsErr),
      wrongCredentialsErr
    )),
    does(
      alert('error', {message: errorMessageOnLogin}),
      authErrors[wrongCredentialsErrMessage]
    ),
    ...unauthorize()
  ])
);

test('DRIV-383 - getDriver return Unknown Error',
  saga(auth, [
    getToken,
    ...loginBegin(null),
    throws(does(call(validateErrorsForAuth, unknownErr), unknownErr)),
    does(
      alert('error', {message: unknownErrMessage}),
      unknownErrMessage
    ),
    ...unauthorize(),
    does(loadingStop()),
    ...loginBegin(null)
  ])
);

test('DRIV-383 - getDriver return invalid_user_password (on mobile platform)',
  saga(auth, [
    getToken,
    ...loginBegin(null),
    throws(does(call(validateErrorsForAuth, invalidUserDataErr), invalidUserDataErr)),
    does(
      alert('error', {message: errorMessageOnLogin}),
      authErrors[invalidUserDataErrMessage]
    ),
    ...unauthorize()
  ])
);

test('DRIV-383 - getDriver return invalid_password (on mobile platform)',
  saga(auth, [
    getToken,
    ...loginBegin(null),
    throws(does(call(validateErrorsForAuth, invalidaPasswordErr), invalidaPasswordErr)),
    does(
      alert('error', {message: errorMessageOnLogin}),
      authErrors[invalidaPasswordErrMessage]
    ),
    ...unauthorize()
  ])
);

test('DRIV-383 - errors occured on initializing of the application',
  saga(auth, [
    getToken,
    does(call(verifyToken, authObject.idToken), authObject.idToken),
    ...unauthorize(false),
    throws(does(call(validateErrorsForAuth, unknownErr), unknownErr))
  ])
);

test('DRIV-383 - handleError function got error',
  saga(handleError, [
    does(call(validateErrorsForAuth, unknownErrMessage)),
    does(alert('error', {message: unknownErrMessage.message}), unknownErrMessage.message)
  ], unknownErrMessage)
);

test(`DRIV-383 - SPECIAL FOR COVERAGE -
      validateErrorsForAuth() for Not Found error`, t => {
  const errorMessage = validateErrorsForAuth(notFoundErr);
  t.deepEqual(errorMessage, driverNotSetup);
});

test(`DRIV-383 - SPECIAL FOR COVERAGE -
      validateErrorsForAuth() for Wrong email or password error`, t => {
  const errorMessage = validateErrorsForAuth(wrongCredentialsErr);
  t.deepEqual(errorMessage, errorMessageOnLogin);
});

test(`DRIV-383 - SPECIAL FOR COVERAGE -
      validateErrorsForAuth() for Unknown error`, t => {
  const errorMessage = validateErrorsForAuth(unknownErr);
  t.deepEqual(errorMessage, unknownErrMessage);
});

test(`DRIV-383 - SPECIAL FOR COVERAGE -
      validateErrorsForAuth() for description`, t => {
  const errorMessage = validateErrorsForAuth({code: 'invalid_grant', description: {}});
  t.deepEqual(errorMessage, 'invalid_grant');
});

test(`DRIV-383 - SPECIAL FOR COVERAGE -
      validateErrorsForAuth() for string description `, t => {
  const errorMessage = validateErrorsForAuth({code: 'inval333', description: 'valid_description'});
  t.deepEqual(errorMessage, 'valid_description');
});

test(`DRIV-383 - SPECIAL FOR COVERAGE -
      validateErrorsForAuth() for timeout error `, t => {
  const errorMessage = validateErrorsForAuth(timeoutError);
  t.deepEqual(errorMessage, timeoutError.original.message);
});
