import reducer from 'src/libs/reducer/reducer';

export const initialState = {
  form: '',
  field: ''
};

export default reducer(initialState, [
  ['driverapp/GET_PICTURE', ({form, field}) => ({form, field})]
]);
