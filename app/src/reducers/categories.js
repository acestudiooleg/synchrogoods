import R from 'ramda';
import reducer from 'src/libs/reducer/reducer';
import { types } from '../actions/categories';

export const initialState = {
  list: [],
};

export const getCategoriesList = R.prop(['categories', 'list']);

export default reducer(initialState, [[types.CATEGORIES_RECEIVE, R.prop('categories')]]);
