import {find} from 'test/helpers';
import {store} from 'test/helpers/redux';
import constants from 'src/helpers/mocks/constants.json';
import reducer from 'src/libs/reredux/reducer';
import {combineReducers} from 'redux';
import combined, {reducers} from 'src/reducers';

export const loadConstants = {
  type: 'driverapp/CONSTANTS',
  constants
};

const location = {
  iconName: '',
  name: '',
  location: {lon: 1, lat: 1}
};

export const genLoadWorkOrder = (action, newState, prevState) => ({
  type: 'driverapp/WORK_ORDER_LOAD',
  current: {action, location1: location},
  history: [
    {note: {newState: prevState}},
    {note: {newState}}
  ]
});

export default (action, newState) => {
  const listOfSteps = constants.actionTransitionsOrdered[action];
  const newStateIndex = listOfSteps.indexOf(newState);
  const prevState = listOfSteps[newStateIndex - 1];

  const loadWorkOrder = genLoadWorkOrder(action, newState, prevState);

  const bootstrap = [loadConstants, loadWorkOrder];

  const dispatchOn = (simulate, action, result) =>
    async (t, {holder}) => {
      t.deepEqual(await new Promise((resolve, reject) => {
        store.replaceReducer(combineReducers({
          ...reducers,
          testReducer: reducer({}, [[action, resolve]])
        }));
        simulate(holder);
        setTimeout(() => reject('Timeout'), 4e3);
      }), result);

      store.replaceReducer(combined);
    };

  const dispatchSetState = (button, newState) => dispatchOn(
    holder => find(button, holder).find('button').simulate('click'),
    'driverapp/SET_WORK_ORDER_STATE',
    {newState}
  );

  return {
    prevState,
    nextState: listOfSteps[newStateIndex + 1],

    loadConstants,
    loadWorkOrder,
    bootstrap,
    dispatchOn,
    dispatchSetState
  };
};
