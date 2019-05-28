import A0 from 'auth0-js';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import {auth0Config} from 'config/auth0';

export const authConf = {
  popup: true,
  connection: 'Username-Password-Authentication',
  scope: 'openid',
  realm: 'Username-Password-Authentication'
};

export const {clientID, domain} = auth0Config;

export const auth0ClassConfig = {
  clientID,
  domain,
  responseType: 'token'
};

const a0 = new A0.WebAuth(auth0ClassConfig);

const handler = (s, f) => (error, result) => {
  if (error) {
    return f(error);
  }
  if (result.idToken) {
    result.idTokenPayload = jwtDecode(result.idToken);
  }
  s(result);
};

export const signIn = (username, password) => {
  return new Promise((resolve, reject) => {
    const conf = {
      ...authConf,
      username,
      password
    };
    a0.client.login(conf, handler(resolve, reject));
  });
};

export const resetPassword = email => {
  return new Promise((resolve, reject) => {
    const {connection} = authConf;
    const conf = {
      connection,
      email
    };
    a0.changePassword(conf, handler(resolve, reject));
  });
};

export const logout = () =>
  a0.logout({clientID});

export const verifyToken = token => {
  try {
    const payload = jwtDecode(token);
    if (payload && payload.exp) {
      return moment().isBefore(moment.unix(payload.exp));
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

