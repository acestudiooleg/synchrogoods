import { combineReducers } from 'redux';
import router from './router';
import page from './page';
import categories from './categories';
import products from './products';
import modalWindow from './modalWindow';

export const reducers = {
  page,
  router,
  categories,
  products,
  modalWindow,
};

export default combineReducers(reducers);
