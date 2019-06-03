import { makeAction } from '../helpers/redux';

const PRODUCTS_RECEIVE_LIST = 'PRODUCTS/RECEIVE_LIST';
const PRODUCTS_ADD_ITEM = 'PRODUCTS/ADD_ITEM';
const PRODUCTS_UPDATE_ITEM = 'PRODUCTS/UPDATE_ITEM';
const PRODUCTS_DELETE_ITEM = 'PRODUCTS/DELETE_ITEM';

export const types = {
  PRODUCTS_RECEIVE_LIST,
  PRODUCTS_ADD_ITEM,
  PRODUCTS_UPDATE_ITEM,
  PRODUCTS_DELETE_ITEM,
};

export default {
  receiveList: makeAction(PRODUCTS_RECEIVE_LIST),
  addItem: makeAction(PRODUCTS_ADD_ITEM),
  updateItem: makeAction(PRODUCTS_UPDATE_ITEM),
  deletetem: makeAction(PRODUCTS_DELETE_ITEM),
};
