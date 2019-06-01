import { combineReducers } from 'redux';
import router from './router';
import page from './page';
import categories from './categories';
import products from './products';

export const reducers = {
  page,
  router,
  categories,
  products,
};

export default combineReducers(reducers);
