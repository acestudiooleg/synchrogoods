import reducer from 'src/libs/reredux/reducer';

export const initialState = {
  authorized: false,
  authObject: {},
  authPair: {}
};

export default reducer(initialState, [

  ['driverapp/LOGIN', ({authPair = {}}) => ({authPair})],

  ['driverapp/UNAUTHORIZE', () => ({authorized: false, authObject: {}})],

  ['driverapp/AUTHORIZE', ({authObject = {}}) => ({
    authorized: true,
    authObject
  })]

]);
