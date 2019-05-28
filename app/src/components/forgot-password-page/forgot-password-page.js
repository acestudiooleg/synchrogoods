import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import pure from 'src/decorators/pure';

import Logo from 'src/components/logo/logo';
import Input from 'src/components/input/input';
import Button from 'src/components/button/button';

import styles from './forgot-password-page.css';

@pure
export default class ForgotPasswordPage extends Component {
  static propTypes = {
    sent: PropTypes.bool
  };

  static defaultProps = {
    sent: false
  };

  renderForm() {
    return (
      <form className={cx(styles.form)}>
        <div>
          <Input
            type="email"
            label="Email address or username"
            icon="user"
            />
        </div>

        <div>
          <Button type="submit" caption="Send Recovery Email"/>
        </div>
      </form>
    );
  }

  renderMessage() {
    return (
      <section data-name="message" className={cx(styles.message)}>
        <p>
          We have done here. Wait for the email.
        </p>

        <a href="">Return to login screen</a>
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
