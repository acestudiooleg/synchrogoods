import React from 'react';
import {wrap} from 'src/libs/reredux/reredux';
import {storiesOf, action} from '@kadira/storybook';

import LoginPage from './login-page';

storiesOf('LoginPage', module)
  .addDecorator(story => wrap(story()))

  .add('login page', () => (
    <LoginPage onSubmit={action('submit')}/>
  ));
