/* eslint camelcase: 0 */
import path from 'path';
import test from 'ava';
import sha1 from 'sha1';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {cloudinary} from 'config/api';

const {apiSecret, apiKey: api_key, cloudName, apiVersion} = cloudinary;

const moment = () => ({unix: () => 1});

const setup = makeRest => {
  const {upload, sign, headers, uploadUrl, rotate, makeRotatedUrl,
    makeThumbnailUrl} = proxyquire('./cloudinary-lib', {
      moment,
      'src/libs/request/request': {
        ...(makeRest ? {makeRest} : {})
      }
    });
  return {
    upload, sign, headers, uploadUrl, rotate, makeRotatedUrl,
    makeThumbnailUrl};
};

test('should create signature', t => {
  const {sign} = setup();
  const c = 'c';
  const b = 'b';
  const a = 'a';
  const expected = sha1(`a=${a}&b=${b}&c=${c}${apiSecret}`);
  const signature = sign({c, b, a});
  t.is(signature, expected);
});

test('should transform url to rotate', t => {
  const {makeRotatedUrl} = setup();
  const public_id = 'd_54';
  const u = a =>
    `http://example/a/b/c/${a ? ('a_' + a + '/') : ''}${public_id}.jpg`;
  const url = u();
  const angle = 45;
  const expected = {
    rotatedUrl: u(angle),
    public_id
  };
  const result = makeRotatedUrl(url, angle);
  t.deepEqual(result, expected);
});

test('should transform url to thumbnail', t => {
  const {makeThumbnailUrl} = setup();
  const u = a =>
    `http://example/a/b/c/${a ? ('w_' + a + ',c_scale/') : ''}d_54.jpg`;
  const url = u();
  const size = 45;
  const expected = u(size);
  const result = makeThumbnailUrl(url, size);
  t.is(result, expected);

  const b64 = 'data:base64';
  t.is(makeThumbnailUrl(b64, size), b64);
});

test('upload', t => {
  const image = '123';
  const fileName = 'name';

  const response = {
    id: 1,
    fileName,
    url: '123'
  };

  const set = sinon.spy();
  const post = sinon.spy();
  const send = sinon.spy();

  const rest = {
    post: url => {
      post(url);
      return {
        set: h => {
          set(h);
          return {
            send: params => {
              send(params);
              return response;
            }
          };
        }
      };
    }
  };

  const makeRest = () => rest;

  const {upload, sign, headers, uploadUrl} = setup(makeRest);

  const params = {
    file: image,
    overwrite: true,
    public_id: fileName,
    api_key,
    timestamp: moment().unix(),
    signature: sign({
      public_id: fileName, timestamp: moment().unix(), overwrite: true
    })
  };

  const result = upload(image, fileName);

  t.deepEqual(result, response);
  t.is(post.args[0][0], path.join(apiVersion, cloudName, uploadUrl));
  t.deepEqual(set.args[0][0], headers);
  t.deepEqual(send.args[0][0], params);
});

test('rotate', t => {
  const response = {
    id: 1,
    url: '123'
  };

  const makeRest =
    () => ({post: () => ({set: () => ({send: () => response})})});

  const {rotate} = setup(makeRest);

  const result = rotate('http://a.com/a/t.jpg', 45);

  t.deepEqual(result, response);
});
