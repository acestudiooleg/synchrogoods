import R from 'ramda';
import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getItem} from 'src/libs/localstorage/localstorage';
import cx from 'classnames';
import pure from 'src/decorators/pure';
import Input from 'src/components/input/input';
import Button from 'src/components/button/button';
import Logo from 'src/components/logo/logo';
import validation from 'src/libs/form-validation/form-validation';
import styles from './login-page.css';

const validate = validation();

export const mapState = () => ({
  initialValues: {
    authUser: getItem('lastUsername') || ''
  }
});

@connect(mapState)
@reduxForm({form: 'login', validate})
@pure
export default class LoginPage extends Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      authUser: PropTypes.string
    }),
    handleSubmit: PropTypes.func,
    openResetPassword: PropTypes.func,
    submitting: PropTypes.bool
  }

  static defaultProps = {
    authUser: '',
    handleSubmit: R.identity,
    openResetPassword: R.identity
  }

  render() {
    const {handleSubmit, submitting, openResetPassword} = this.props;
    return (
      <section data-name="login-page" className={cx(styles.wrapper)}>
        <header className={cx(styles.header)}>
          <div data-name="logo"><Logo/></div>
          <h1>Welcome back!</h1>
          <h2>Today is a good day for a good day</h2>
        </header>

        <form onSubmit={handleSubmit} className={cx(styles.form)}>
          <div>
            <Field
              name="authUser"
              label="Email address"
              icon="user"
              component={Input}
              />
          </div>
          <div>
            <Field
              name="authPass"
              type="password"
              label="Password"
              icon="psw"
              component={Input}
              />
          </div>
          <div>
            <Button type="submit" caption="Sign in" disabled={submitting}/>
          </div>
        </form>

        <footer className={cx(styles.footer)}>
          <Button
            color="grey"
            onClick={openResetPassword}
            caption="Forgot your password?"
            />
        </footer>
      </section>
    );
  }
}
