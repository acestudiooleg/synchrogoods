import R from 'ramda';
import reducer from 'src/libs/reducer/reducer';
import { types } from '../actions/products';

const fakeProducts = [
  {
    id: 1,
    categoryId: 1,
    title: 'Milk',
    description: 'Jagotinske',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    categoryId: 1,
    title: 'Potatos',
    description: 'yang',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const initialState = {
  products: [...fakeProducts],
};

export const getProducts = R.prop('products');

export default reducer(initialState, [[types.PRODUCTS_RECEIVE, getProducts]]);
