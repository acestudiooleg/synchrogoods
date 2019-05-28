import test from 'ava';
import {decorate} from 'src/decorators/helpers';

test('decorate', t => {
  const name = '__TEST__';
  const result = decorate({name}, {});
  t.is(result.displayName, name);
});
