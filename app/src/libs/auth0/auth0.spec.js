import test from 'ava';
import proxyquire from 'proxyquire';
import {generateToken} from 'test/helpers/auth';

const username = 'name';
const password = 'pass';
const email = 'qwerty@mail.com';

const successLoginResponce = {
  idToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzVOek5CUmpZeU1VTXdNRE5GUm' +
  'pFMFJVS' +
  'TNORFZDTjBORU5FRkNNMFEyTnpJNVJFVTFSQSJ9.eyJuYW1lIjoiRGFuIFdlYmVyIiwiZW1haWwiOiJkYW5AbWFya2' +
  'V0c291cC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly90ZXN0LXNoaXR0eS1zZWFyY2guZ' +
  'XUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE0MjcyMTcyODA3MDUxODc1MjIzIiwiYXVkIjoiSHZWb' +
  'k5pdXlZRnhSQ1VIdV9ER0xRQ0VrR2piRUozX28iLCJpYXQiOjE1MDY3MDU2ODEsImV4cCI6MTUwNjc0MTY4MX0.lTz' +
  'R1tYs0k' +
  'o1gwsmL4V2FnuSlGVmV2PLOWDSubfWbJ0pR6CjjNEwKSBcy9h8xZvsq5DP4_pN3NRbAHuoxGcwoQtN3NCSs0u' +
  '_yvGlG-ZXdxE' +
  'mNxbI-lEsjAncNYUFTC60X-se4PVNiDNSWaiS78T7wNYEN-d8SvFhB1kB4XMJYhtf7GikDQGBldgdX9J5Nv6phWwIp' +
  'WVaB4xJf' +
  '-Xm7uYgviWL1gxQlNEQb7J_e-zsWWfLKfDG-MUWtH77JJ44RkpjouoX5jBvmwxWixSeszdkJSGS3nhtfuefofN46fWi' +
  'EX3gAp1ENwcs7' +
  'kmzmIyk81YeGqh9V5f2eSCtasoZt4pxrA'
};
const successResetResponce = {
  message: 'ok'
};

const unauthorizedMessage = {code: 401, message: 'Unauthorized'};
const errorResetMessage = {code: 404, message: 'Email not found'};

const makeFakeClass = ({
    login = (() => 1),
    changePassword = (() => 1),
    logout = (() => 1)
  }) =>
  function (classConfig) {
    this.classConfig = classConfig;
    this.client = {login};
    this.logout = logout;
    this.changePassword = changePassword;
  };

const setup = config => proxyquire('./auth0', {
  'auth0-js': {WebAuth: makeFakeClass(config)}
});

test('auth0 class configuration', async t => {
  let config = {};
  const {auth0ClassConfig} = proxyquire('./auth0', {
    'auth0-js': {
      WebAuth: cfg => {
        config = cfg;
      }}
  });
  t.deepEqual(config, auth0ClassConfig);
});

test('login with correct username and password', async t => {
  let actualAuthCfg = {};
  const {signIn, authConf} = setup({
    login(cfg, handler) {
      actualAuthCfg = cfg;
      return handler(null, successLoginResponce);
    }
  });
  const loginResponce = await signIn(username, password);
  t.deepEqual(actualAuthCfg, {...authConf, username, password});
  t.deepEqual(loginResponce, successLoginResponce);
});

test('login with wrong username and password', async t => {
  let actualAuthCfg = {};
  const {signIn, authConf} = setup({
    login(cfg, handler) {
      actualAuthCfg = cfg;
      return handler(null, {code: 'invalid_grant', description: 'Wrong email or password.'});
    }
  });
  try {
    await signIn(username, password);
  } catch (err) {
    t.deepEqual(actualAuthCfg, {...authConf, username, password});
    t.deepEqual(err, unauthorizedMessage);
  }
});

test('reset password with correct email', async t => {
  let actualResetPasswordConfig = {};
  const {resetPassword, authConf: {connection}} = setup({
    changePassword(cfg, handler) {
      actualResetPasswordConfig = cfg;
      return handler(null, successResetResponce);
    }
  });
  const resetResponce = await resetPassword(email);
  t.deepEqual(actualResetPasswordConfig, {
    connection,
    email
  });
  t.deepEqual(resetResponce, successResetResponce);
});

test('reset password wrong correct email', async t => {
  let actualResetPasswordConfig = {};
  const {resetPassword, authConf: {connection}} = setup({
    changePassword(cfg, handler) {
      actualResetPasswordConfig = cfg;
      return handler(errorResetMessage);
    }
  });
  try {
    await resetPassword(email);
  } catch (err) {
    t.deepEqual(actualResetPasswordConfig, {
      connection,
      email
    });
    t.deepEqual(err, errorResetMessage);
  }
});

test('logout test', async t => {
  let logoutCfg = {};
  const {logout, clientID} = setup({
    logout(cfg) {
      logoutCfg = cfg;
      return true;
    }
  });
  t.truthy(logout());
  t.deepEqual(logoutCfg, {clientID});
});

test('logout test some error', async t => {
  const {logout} = setup({
    logout: 'error'
  });
  try {
    t.truthy(logout());
  } catch (err) {
    t.truthy(err instanceof Error);
  }
});

const verifyTokenHelper = (valid, wrongToken, withoutExp) => t => {
  const {verifyToken} = setup({});
  const token = generateToken(valid, wrongToken, withoutExp);
  const isValid = verifyToken(token);
  return valid ? t.truthy(isValid) : t.falsy(isValid);
};

test('verifyToken with correct token', verifyTokenHelper(true));
test('verifyToken with expired token', verifyTokenHelper());

test('verifyToken with empty token',
  verifyTokenHelper(false, 'empty'));

test('verifyToken with invalid token',
  verifyTokenHelper(false, '123'));

test('verifyToken with exp empty token',
  verifyTokenHelper(false, null, true));

