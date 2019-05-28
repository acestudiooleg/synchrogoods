import test from 'ava';
import reducer, {initialState} from './upload-button';

test('initial state', t => {
  const newState = reducer(undefined, {
    type: 'driverapp/SOME_ACTION'
  });

  t.deepEqual(newState, initialState);
});

test('should save form and field name', t => {
  const formAndFieldNames = {
    form: 'note',
    field: 'note.picture'
  };
  const newState = reducer(undefined, {
    type: 'driverapp/GET_PICTURE',
    ...formAndFieldNames
  });

  t.deepEqual(newState, formAndFieldNames);
});
