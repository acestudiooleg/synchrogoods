import url from 'url';
import R from 'ramda';
import superagent from 'superagent';
import {baseURL, timeout} from 'config/api';
import {getItem} from '../localstorage/localstorage';

const methods = ['get', 'post', 'put', 'del'];

const make = (method, baseURL, getToken = R.identity, timeout) => path => {
  const token = getToken();
  return superagent[method](url.resolve(baseURL, path))
  .timeout(timeout)
  .set('Authorization', `Bearer ${token}`);
};

export const makeRest = (baseURL, token, timeout) => R.reduce((req, method) =>
  R.set(R.lensProp(method),
    make(method, baseURL, token, timeout), req), {}, methods);

export default makeRest(baseURL, () => getItem('idToken'), timeout);
