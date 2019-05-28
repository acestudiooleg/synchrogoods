import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import presence from 'test/helpers/presence-test';

import ForgotPasswordPage from './forgot-password-page';

const setup = (props = {}) => {
  const holder = shallow(<ForgotPasswordPage {...props}/>);
  return {
    holder,
    logo: holder.find('header Logo'),
    ...(props.sent ? {
      message: holder.find('section[data-name="message"] p'),
      backToLogin: holder.find('section[data-name="message"] a')
    } : {
      emailInput: holder.find('Input[type="email"]'),
      resetPasswordButton: holder.find('Button')
    })
  };
};

test('all of the forgot password form components',
  presence(setup));

test('all of the forgot password message components',
  presence(() => setup({sent: true})));
