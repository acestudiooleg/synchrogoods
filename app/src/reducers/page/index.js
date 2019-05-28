import reducer from 'src/libs/reredux/reducer';

export const initialState = {};

export default reducer(initialState, [

  ['driverapp/PAGE_CHANGE', ({name, wait}, state) => ({
    ...state,
    [name]: !wait
  })],

  ['driverapp/PAGE_LOADED', ({name}, state) => ({
    ...state,
    [name]: true
  })],

  ['driverapp/PAGE_UNLOADED', ({name}, state) => ({
    ...state,
    [name]: false
  })],

  ['driverapp/UNAUTHORIZE', (action, state) => {
    return Object.keys(state).reduce((newState, page) => ({
      ...newState, [page]: false
    }), {});
  }]
]);
