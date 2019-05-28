#! /usr/bin/env node
/* eslint import/order: 0 */
const fs = require('fs');
const async = require('async');
const _ = require('lodash');
const jsTplFile = require('./component.tpl');
const specTplFile = require('./component.spec.tpl');
const storyTplFile = require('./component.story.tpl');

const ComponentName = process.argv[2];
const useMock = process.argv[3];
const CamelComponentName = _.camelCase(ComponentName);
const CapitalizedComponentName = _.upperFirst(CamelComponentName);

if (!ComponentName) {
  console.log('Please type component name');
  return;
}
const cssFile = require('./component.css.tpl');

const jsFile = jsTplFile(ComponentName, CapitalizedComponentName);
const specFile = specTplFile(ComponentName, CapitalizedComponentName);
const storyFile = storyTplFile(ComponentName, CapitalizedComponentName);

const path = './src/components/';
const dir = path + ComponentName;
const files = [{
  name: ComponentName + '.js',
  content: jsFile
}, {
  name: ComponentName + '.spec.js',
  content: specFile
}, {
  name: ComponentName + '.story.js',
  content: storyFile
}, {
  name: ComponentName + '.css',
  content: cssFile
}];

if (useMock) {
  const mockTplFile = require('./component.mock.tpl');

  const mockFile = mockTplFile(ComponentName, CapitalizedComponentName);
  files.push({
    name: ComponentName + '.mock.js',
    content: mockFile
  });
}

const fileHandler = function (file, done) {
  return function (err) {
    if (err) {
      done(err);
      return;
    }
    console.log(file + ' has been saved');
  };
};

fs.exists(dir, exists => {
  if (exists) {
    console.log('Error!! Directory exists');
  } else {
    fs.mkdir(dir, '0755', err => {
      if (err) {
        console.log(err);
      } else {
        async.each(files, (file, done) => {
          const filename = dir + '/' + file.name;
          fs.writeFile(filename, file.content, fileHandler(filename, done));
        }, err => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }
});
