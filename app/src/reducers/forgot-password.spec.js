import test from 'ava';

import forgotPassword, {initialState} from './forgot-password';

const email = 'email@mail.com';

test('initial state', t => t.deepEqual(
  forgotPassword(undefined, {type: undefined}),
  initialState
));

test('RESET_PASSWORD_FORM_OPEN', t => t.deepEqual(
  forgotPassword(undefined,
    {type: 'driverapp/RESET_PASSWORD_FORM_OPEN'}),
  {...initialState, isResetPasswordForm: true}
));

test('RESET_PASSWORD', t => t.deepEqual(
  forgotPassword({...initialState, isResetPasswordForm: true},
    {type: 'driverapp/RESET_PASSWORD', email}),
  {...initialState, isResetPasswordForm: true, email}
));

test('SHOW_MESSAGE', t => t.deepEqual(
  forgotPassword(
    {isResetPasswordForm: true, email},
    {type: 'driverapp/SHOW_MESSAGE'}
  ),
  {isResetPasswordForm: true, sent: true, email},
));

test('RESET_PASSWORD_FORM_RESET', t => t.deepEqual(
  forgotPassword(
    {sent: true, email},
    {type: 'driverapp/RESET_PASSWORD_FORM_RESET'}
  ),
  initialState
));
