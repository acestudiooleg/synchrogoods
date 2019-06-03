import R from 'ramda';
import reducer from 'src/libs/reducer/reducer';
import { withList } from 'src/helpers/redux';
import { types } from '../actions/products';

const fakeProducts = [
  {
    id: 1,
    categoryId: 1,
    title: 'Milk',
    description: 'Jagotinske',
    isDone: false,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    categoryId: 1,
    title: 'Potatos',
    description: 'yang',
    isDone: false,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const initialState = {
  list: [...fakeProducts],
};

export const getProductsList = R.path(['products', 'list']);

export default reducer(initialState, [
  [types.PRODUCTS_RECEIVE_LIST, R.prop('products')],
  [types.PRODUCTS_ADD_ITEM, withList((product, list) => [...list, product])],
  [types.PRODUCTS_UPDATE_ITEM, withList((product, list) => list.map(p => (p.id === product.id ? product : p)))],
  [types.PRODUCTS_DELETE_ITEM, withList((product, list) => list.filter(p => p.id !== product.id))],
]);
