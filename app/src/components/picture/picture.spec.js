import test from 'ava';
import proxyquire from 'proxyquire';
import React from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';
import {makeThumbnailUrl} from 'src/libs/cloudinary-lib/cloudinary-lib';
import presenceTest from 'test/helpers/presence-test';
import testClassName from 'test/helpers/class-name-test';
import ImagesUrls from './picture.mock';

const setup = (props = {}, proxy = {}) => {
  const {default: Picture} = proxyquire('./picture', proxy);
  const holder = mount(<Picture {...props}/>);
  return {
    holder,
    imageWrapper: holder.find('[data-name="image-wrapper"]'),
    image: holder.find('img')
  };
};

test('present test', presenceTest(() => setup({url: '123'})));

test('has correct url', t => {
  const [{url: guitar}] = ImagesUrls;
  const {image} = setup({url: guitar});
  t.is(image.prop('src'), makeThumbnailUrl(guitar, 180));
});

test('has correct alt', t => {
  const alt = 'girl';
  const {image} = setup({alt, url: '123'});
  t.is(image.prop('alt'), alt);
});

const image = {setup: (props, proxy) => setup({...props, url: '123'}, {...proxy}),
  component: 'imageWrapper', css: './picture.css'};

const fullscreen = {...image, className: 'fullscreen', prop: 'fullscreen'};
test('with fullscreen', testClassName({...fullscreen, value: true}));

test('should call onClick callback', t => {
  const onClick = sinon.spy();
  const {image} = setup({onClick, url: '123'});

  image.simulate('click');

  t.true(onClick.calledOnce);
});

test('DRIV-367 should add class onImageError', t => {
  const fullscreen = 'hashForFullscreen';
  const imgError = 'hashForImgError';
  const style = {'./picture.css': {fullscreen, imgError}};
  const onPictureError = sinon.spy();
  const {image, holder} = setup({url: '123', fullscreen}, style);

  holder.get(0).image.classList.add = onPictureError;

  image.simulate('error');
  t.true(onPictureError.called);
  t.is(onPictureError.args[0][0], imgError);
});
