import R from 'ramda';
import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import pure from 'src/decorators/pure';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import validation from 'src/libs/form-validation/form-validation';
import Logo from 'src/components/logo/logo';
import Input from 'src/components/input/input';
import Button from 'src/components/button/button';

import styles from './forgot-password-page.css';

const validate = validation();

export const mapState = state => ({
  email: state.forgotPassword.email,
  sent: state.forgotPassword.sent
});

@connect(mapState)
@pure
@reduxForm({form: 'resetPassword', validate})
export default class ForgotPasswordPage extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    closeResetPassword: PropTypes.func,
    submitting: PropTypes.bool,
    sent: PropTypes.bool
  };

  static defaultProps = {
    sent: false,
    handleSubmit: R.identity,
    closeResetPassword: R.identity
  };

  renderForm() {
    const {handleSubmit, closeResetPassword, submitting} = this.props;

    return (
      <form
        data-name="forgot-password-page"
        onSubmit={handleSubmit}
        className={cx(styles.form)}
        >
        <div>
          <Field
            name="email"
            type="text"
            label="Email address"
            icon="user"
            component={Input}
            />
        </div>

        <div className={styles.actions}>
          <div>
            <Button
              type="submit"
              disabled={submitting}
              caption="Send Recovery Email"
              />
          </div>
          <div>
            <Button
              color="grey"
              onClick={closeResetPassword}
              caption="Return to login screen"
              />
          </div>
        </div>
      </form>
    );
  }

  renderMessage() {
    const {closeResetPassword} = this.props;
    return (
      <section data-name="message" className={cx(styles.message)}>
        <p>
          We have done here. Wait for the email.
        </p>

        <Button
          onClick={closeResetPassword}
          caption="Return to login screen"
          />
      </section>
    );
  }

  render() {
    const {sent} = this.props;

    return (
      <section className={cx(styles.wrapper)}>
        <header className={cx(styles.header)}>
          <div data-name="logo" className={styles.logo}><Logo/></div>
          <h1 className={styles.title}>Reset Password</h1>
        </header>

        {sent ? this.renderMessage() : this.renderForm()}
      </section>
    );
  }
}
