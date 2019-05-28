module.exports = (ComponentName, CapitalizedComponentName) =>
`import test from 'ava';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import React from 'react';
import {shallow} from 'enzyme';
import testClassName from 'test/helpers/class-name-test';
import presenceTest from 'test/helpers/presence-test';

const setup = (props = {}, proxy = {}) => {
  const {default: ${CapitalizedComponentName}} =
    proxyquire('./${ComponentName}', proxy);
  const holder = shallow(<${CapitalizedComponentName} {...props}/>);
  return {
    // holder,
    // title: holder.find('span'),
  };
};

test('present test', presenceTest(setup));

// test('test description', t => {
//   const {title} = setup({title: headerTitle});
//
//   t.is(title.text(), headerTitle);
// });
`;
