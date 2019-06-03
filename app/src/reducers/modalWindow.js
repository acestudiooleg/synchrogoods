import R from 'ramda';
import reducer from 'src/libs/reducer/reducer';
import { types, close } from '../actions/modalWindow';

const initialState = {
  state: close,
};

export const getModalWindowState = R.path(['modalWindow', 'state']);

export default reducer(initialState, [
  [
    types.CHANGE_MODAL_WINDOW,
    ({ payload: { modalState } }) => ({ state: modalState }),
  ],
]);
