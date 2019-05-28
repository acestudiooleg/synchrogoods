import React from 'react';
import {storiesOf} from '@kadira/storybook';

import UploadButton from './upload-button';

const picture = 'https://giggear.co.uk/data/upload/files/2015%20Blog/' +
                'gibson-les-paul-standard-2013-plus-lpnstdphsch1-3.jpg';

storiesOf('UploadButton', module)

  .add('upload button', () => (
    <UploadButton input={{}}/>
  ))

  .add('thumbnail', () => (
    <UploadButton input={{value: picture}}/>
  ))

  .add('error', () => (
    <UploadButton input={{}} meta={{touched: true, error: 'Required field'}}/>
  ));
