export const types = {
  CATEGORIES_RECEIVE: 'CATEGORIES/RECEIVE',
};

export default {
  receive: categories => ({ type: types.CATEGORIES_RECEIVE, categories }),
};
