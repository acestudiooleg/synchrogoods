import fs from 'fs';
import test from 'ava';
import proxyquire from 'proxyquire';
import xml2js from 'xml2js';
import constants from 'src/helpers/mocks/constants.json';
import {initialState} from 'src/reducers/update/update';

(process.env.CI ? test : test.skip)('should render without any issue', t => {
  proxyquire('src/app', {});

  t.pass();
});

test('DRIV-378 should have single version across the app', t => {
  const parser = new xml2js.Parser();
  const {driverApp: {androidVersion}} = constants;
  const xmlFile = fs.readFileSync('../../config.xml', 'utf8');

  parser.parseString(xmlFile, (error, result) => {
    t.true(!error);
    t.is(androidVersion, result.widget.$.version);
    t.is(androidVersion, initialState.appVersion);
  });
});
