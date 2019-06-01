import R from 'ramda';
import reducer from 'src/libs/reducer/reducer';
import { types } from '../actions/categories';

export const initialState = {
  categories: [],
};

export default reducer(initialState, [
  [types.CATEGORIES_RECEIVE, R.prop('categories')],
]);
