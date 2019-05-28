import test from 'ava';
import React from 'react';

import {connectedComponent, reduxSetup} from 'test/helpers/redux';
import ForgotPasswordPage from './forgot-password-page';

const setup = reduxSetup(props => <ForgotPasswordPage {...props}/>);

const setEmptyEmailToForm = (payload = '') => ({
  type: 'redux-form/CHANGE',
  meta: {
    form: 'resetPassword',
    field: 'email',
    touch: true,
    persistentSubmitErrors: false
  },
  payload
});

const submit = error => ({
  type: 'redux-form/SET_SUBMIT_FAILED',
  meta: {
    form: 'resetPassword',
    fields: [
      'email'
    ]
  },
  error
});

test('connected component', connectedComponent(ForgotPasswordPage));

const checkError = (actionsBefore, errorText) => t => {
  const pattern = new RegExp(errorText);
  const s = setup({}, actionsBefore);
  const {holder} = s;
  const emailField = holder.find('[name="email"]');
  const actualText = emailField.parent().text();
  t.truthy(pattern.test(actualText));
  return s;
};

test('try to send empty email, should see error required',
  checkError([setEmptyEmailToForm(), submit(true)], 'Required'));

test('try to send wrong email, should see error required',
  checkError(
    [
      setEmptyEmailToForm('qwerty'),
      submit(true)
    ],
    'Please, enter correct email'
  )
);

test('try to send correct email, should see error required',
  checkError(
    [
      setEmptyEmailToForm('qwerty@mail.com'),
      submit()
    ],
    ''
  )
);

test('try to back to login page after reset', t => {
  const {holder} = setup({},
    [
      setEmptyEmailToForm('qwerty@mail.com'),
      submit(),
      {type: 'driverapp/SHOW_MESSAGE'}
    ]);
  const backToLogin =
    holder.find('button[title="Send Recovery Email"]');
  const successFullMessage =
    holder.find('[data-name="message"] p').text();

  t.is(successFullMessage, 'We have done here. Wait for the email.');
  t.is(backToLogin.length, 0);
});

