import R from 'ramda';
import reducer from 'src/libs/reredux/reducer';

export const initialState = {
  history: {},
  match: {},
  location: {}
};

export default reducer(initialState, [

  ['driverapp/ROUTER', R.prop('router')]

]);
