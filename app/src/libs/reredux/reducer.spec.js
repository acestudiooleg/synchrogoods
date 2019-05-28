import test from 'ava';
import reducer from './reducer';

test('reducer', t => {
  const initialState = {a: 1};
  const newValue = {b: 2};
  const ACTION = 'test/ACTION';

  const r = reducer(initialState, [[ACTION, () => newValue]]);

  t.deepEqual(r(undefined, {type: 'undefined'}), {a: 1});
  t.deepEqual(r(undefined, {type: ACTION}), {a: 1, b: 2});
  t.deepEqual(r({c: 1}, {type: ACTION}), {c: 1, b: 2});
});
