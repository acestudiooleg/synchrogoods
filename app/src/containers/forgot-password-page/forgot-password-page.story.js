import React from 'react';
import {storiesOf} from '@kadira/storybook';

import ForgotPasswordPage from './forgot-password-page';

storiesOf('ForgotPasswordPage', module)

  .add('form', () => (
    <ForgotPasswordPage/>
  ))

  .add('message', () => (
    <ForgotPasswordPage sent/>
  ));
