export const types = {
  PRODUCTS_RECEIVE: 'PRODUCTS/RECEIVE',
};

export default {
  receive: categories => ({ type: types.PRODUCTS_RECEIVE, categories }),
};
