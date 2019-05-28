import reducer from 'src/libs/reredux/reducer';

export const initialState = {
  form: '',
  field: ''
};

export default reducer(initialState, [
  ['driverapp/GET_PICTURE', ({form, field}) => ({form, field})]
]);
