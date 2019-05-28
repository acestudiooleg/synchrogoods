import {combineReducers} from 'redux';
import router from './router';
import page from './page';

export const reducers = {
  page,
  router
};

export default combineReducers(reducers);
