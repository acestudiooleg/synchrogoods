import test from 'ava';
import proxyquire from 'proxyquire';
import express from 'express';
import findPort from 'find-open-port';

import * as defaultApiConfig from 'config/api';

const setup = (apiConfig = defaultApiConfig) => {
  const {default: request} = proxyquire('./request', {
    'config/api': apiConfig
  });
  return {request};
};

const setupServer = async (cb, path = '/path') => {
  const port = await findPort();
  const baseURL = `http://localhost:${port}/`;

  const app = express();
  app.get(path, cb);
  const server = app.listen(port);

  return {baseURL, server, path};
};

test('should export a request instance', t => {
  const {request} = setup();
  t.truthy(request.get);
  t.truthy(request.post);
  t.truthy(request.del);
  t.truthy(request.put);
});

test('should use baseURL from config/api.js', async t => {
  const result = '__RESULT__';

  const {server, baseURL, path} = await setupServer((req, res) =>
    res.send(result)
  );

  try {
    const {request} = setup({baseURL});
    const {text: response} = await request.get(path);
    t.is(response, result);
  } finally {
    server.close();
  }
});

test('DRIV-440 should send Authorization header with token', async t => {
  const token = 'token';
  const {server, baseURL, path} = await setupServer(({headers}, res) =>
    res.send(headers.authorization)
  );

  localStorage.setItem('idToken', token);

  try {
    const {request} = setup({baseURL});
    const {text: response} = await request.get(path);
    t.is(response, `Bearer ${token}`);
  } finally {
    server.close();
    localStorage.removeItem('idToken');
  }
});

test('should send error on timeout exceeded', async t => {
  const timeout = 500;
  const {server, baseURL, path} = await setupServer(({query}, res) =>
    setTimeout(() => res.send(111), 600)
  );

  try {
    const {request} = setup({baseURL, timeout});
    await request.get(path);
  } catch (err) {
    t.is(err.timeout, timeout);
    t.is(err.message, `timeout of ${timeout}ms exceeded`);
  } finally {
    server.close();
    localStorage.removeItem('idToken');
  }
});
