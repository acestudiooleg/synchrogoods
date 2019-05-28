module.exports = (ComponentName, CapitalizedComponentName) =>
`import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {wrapper} from 'src/helpers/story/story';

import ${CapitalizedComponentName} from './${ComponentName}';

storiesOf('${CapitalizedComponentName}', module)

  .add('story message', wrapper(() => (
    <${CapitalizedComponentName}/>
  )));
`;
