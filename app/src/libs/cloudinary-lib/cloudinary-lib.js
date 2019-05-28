/* eslint camelcase: 0 */
import path from 'path';
import R from 'ramda';
import moment from 'moment';
import sha1 from 'sha1';
import {makeRest} from 'src/libs/request/request';
import {cloudinary} from 'config/api';

const {
  apiUrl, apiVersion, cloudName, apiSecret: api_secret, apiKey: api_key
} = cloudinary;

const rest = makeRest(apiUrl);

export const sign = params => R.pipe(
    R.keys,
    R.sort((a, b) => a > b),
    R.map(key => key + '=' + params[key]),
    R.join('&'),
    str => str + api_secret,
    sha1
  )(params);

export const uploadUrl = '/image/upload';
export const headers = {
  'Content-Type': 'application/json'
};

export const upload = (image, public_id) => {
  const timestamp = moment().unix();
  const signature = sign({public_id, timestamp, overwrite: true});

  return rest.post(path.join(apiVersion, cloudName, uploadUrl))
    .set(headers)
    .send({
      file: image,
      overwrite: true,
      public_id,
      api_key,
      timestamp,
      signature
    });
};

export const makeRotatedUrl = (url, angle) => {
  const parts = url.split('/');
  const [imageName] = parts.slice(-1);
  const public_id = imageName.split('.')[0];
  const rotatedUrl =
    parts.slice(0, -1).concat([`a_${angle}`], [imageName]).join('/');
  return {rotatedUrl, public_id};
};

export const makeThumbnailUrl = (url, size) => {
  if (/^data\:/.test(url)) {
    return url;
  }
  const parts = url.split('/');
  const [imageName] = parts.slice(-1);
  const rotatedUrl =
    parts.slice(0, -1).concat([`w_${size},c_scale`], [imageName]).join('/');
  return rotatedUrl;
};

export const rotate = (url, angle) => {
  const {rotatedUrl, public_id} = makeRotatedUrl(url, angle);
  return upload(rotatedUrl, public_id);
};

