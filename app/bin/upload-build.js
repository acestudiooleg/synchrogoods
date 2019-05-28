#! /usr/bin/env node
/* eslint import/order: 0 */
const path = require('path');
const {Promise, coroutine, promisifyAll} = require('bluebird');
const cp = promisifyAll(require('child_process'));
const fs = promisifyAll(require('fs'));
const R = require('ramda');
const request = require('superagent-promise')(require('superagent'), Promise);

const getRepoSlug = R.pipeP(
  () => cp.execAsync('git remote show -n origin'),
  R.match(/Fetch URL:.*?:(.*?)\./),
  R.prop(1)
);

const getBranch = R.pipeP(
  () => cp.execAsync('git rev-parse --abbrev-ref HEAD'),
  R.trim
);

const readCredentials = R.pipeP(
  fs.readFileAsync,
  R.toString,
  R.trim,
  R.split(/:/)
);

const bitbucketConfFile = path.join(process.cwd(), '.bitbucket');
const [,, buildFile, version] = process.argv;
const ext = path.extname(buildFile);

const api = coroutine(function * (method) {
  return `https://api.bitbucket.org/2.0/repositories/${
    path.join(yield getRepoSlug(), method)
  }`;
});

const genFileName = coroutine(function * () {
  const branch = yield getBranch();
  const [, ticket] = R.match(/^(\w*?-\d*?)-/, branch);
  return branch === 'master' ? 'latest' : R.toLower(ticket);
});

coroutine(function * () {
  const repo = yield getRepoSlug();
  const fileName = (version || (yield genFileName())) + ext;
  const [name, pass] = yield readCredentials(bitbucketConfFile);

  console.log(`
    Loading ${fileName} to ${repo}...
  `);

  yield request
    .post(yield api('downloads'))
    .auth(name, pass)
    .attach('files', buildFile, fileName)
    .end();

  console.log(`
    ${fileName} just has been uploaded!
    Check it at https://bitbucket.org/${repo}/downloads
  `);
})().catch(console.error);
