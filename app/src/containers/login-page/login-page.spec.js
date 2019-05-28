import test from 'ava';
import React from 'react';
import {mount} from 'test/helpers/redux';
import presence from 'test/helpers/presence-test';
import {setItem} from 'src/libs/localstorage/localstorage';
import LoginPage, {mapState} from './login-page';

const lastUsername = 'someUser';
const initialValues = {
  authUser: lastUsername
};

const setup = (props = {}) => {
  const holder = mount(<LoginPage {...props}/>);
  return {
    holder,
    logo: holder.find('header Logo'),
    greating: holder.find('header h1'),
    moto: holder.find('header h2'),
    authUserInput: holder.find('input[name="authUser"]'),
    authPassInput: holder.find('input[name="authPass"]'),
    signinButton: holder.find('button[type="submit"]'),
    forgotPassword: holder.find('footer button')
  };
};

test('presence', presence(setup));

test('mapState', t => {
  const lastUsername = 'someUser';
  setItem('lastUsername', lastUsername);
  const expected = {
    initialValues
  };

  t.deepEqual(mapState(), expected);
});
