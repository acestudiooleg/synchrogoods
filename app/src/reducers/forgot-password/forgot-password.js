import reducer from 'src/libs/reredux/reducer';

export const initialState = {
  sent: false,
  isResetPasswordForm: false,
  email: ''
};

export default reducer(initialState, [
  ['driverapp/RESET_PASSWORD_FORM_OPEN', () => ({
    isResetPasswordForm: true
  })],
  ['driverapp/RESET_PASSWORD', ({email}) => ({email})],

  ['driverapp/SHOW_MESSAGE', () => ({sent: true})],

  ['driverapp/RESET_PASSWORD_FORM_RESET', () => initialState]

]);
