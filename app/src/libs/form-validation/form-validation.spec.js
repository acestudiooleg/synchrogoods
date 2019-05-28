import test from 'ava';
import validation, {mailRules, required, email}
  from './form-validation';

const validate = validation();

const values = {
  authUser: 'qwerty@qw.ert',
  email: 'qwerty@qw.ert',
  authPass: '123'
};

test('correct fields', t => {
  const errors = validate(values, mailRules);
  t.deepEqual(errors, {});
});

test('test reqired fields', t => {
  const errors = validate({...values, email: ''}, mailRules);
  t.deepEqual(errors, {email: required.message});
});

test('test email fields', t => {
  const errors = validate({...values, email: 'acedfhg'}, mailRules);
  t.deepEqual(errors, {email: email.message});
});

test('test validator if has not rule for field', t => {
  const errors = validate(undefined, mailRules);
  t.deepEqual(errors, {
    authUser: required.message,
    email: required.message,
    authPass: required.message
  });
});
