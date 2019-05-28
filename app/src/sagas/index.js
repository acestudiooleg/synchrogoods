import auth from './auth/auth';
import forgotPassword from './forgot-password/forgot-password';

export default function * rootSaga() {
  yield [
    forgotPassword(),
    auth(),
  ];
}
