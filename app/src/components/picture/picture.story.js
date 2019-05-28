import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Picture from './picture';
import ImagesUrls from './picture.mock';

const [{url: guitar}] = ImagesUrls;
const [, {url: girl}] = ImagesUrls;

const wrapStyle = {
  width: '150px',
  height: '100px',
  border: '1px solid black',
  display: 'inline-block'
};

storiesOf('Picture', module)

  .add('thumbnail guitar', () => (
    <div style={wrapStyle}>
      <Picture url={guitar}/>
    </div>
  ))

  .add('thumbnail girl', () => (
    <div style={wrapStyle}>
      <Picture url={girl}/>
    </div>
  ))

  .add('fullscreen guitar', () => (
    <Picture
      fullscreen
      url={guitar}
      />
  ))

  .add('fullscreen girl', () => (
    <Picture
      fullscreen
      url={girl}
      />
  ))

  .add('image not loaded', () => (
    <Picture
      fullscreen
      url="error"
      alt="girl"
      />
  ));
