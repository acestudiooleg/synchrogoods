import React from 'react';

import {render} from 'react-dom';

import {wrap} from 'src/libs/reredux/reredux';

import App from 'src/containers/app/app';

render(
  wrap(<App/>),
  document.getElementById('root')
);
