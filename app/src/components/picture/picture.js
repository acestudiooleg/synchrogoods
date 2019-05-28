/* eslint react/jsx-no-bind: 0 */
import React, {Component, PropTypes} from 'react';
import pure from 'src/decorators/pure';
import cx from 'classnames';
import R from 'ramda';
import {makeThumbnailUrl} from 'src/libs/cloudinary-lib/cloudinary-lib';
import style from './picture.css';

export const onPictureError = function () {
  this.image.classList.add(style.imgError);
};

@pure
export default class Picture extends Component {
  static propTypes = {
    url: PropTypes.string,
    alt: PropTypes.string,
    fullscreen: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    url: '',
    alt: '',
    fullscreen: false,
    onClick: R.identity
  };

  render() {
    const {url, alt, fullscreen, onClick} = this.props;
    const source = fullscreen ? url : makeThumbnailUrl(url, 180);
    return (
      <div className={cx(style.wrapper)} data-name="picture-container">
        {url &&
          <div
            data-name="image-wrapper"
            className={cx(style.wrapper, {
              [style.fullscreen]: fullscreen
            })}
            >
            <img
              onClick={onClick}
              className={cx(style.picture)}
              src={source}
              alt={alt}
              ref={it => {
                this.image = it;
              }}
              onError={onPictureError.bind(this)}
              />
          </div>
        }
      </div>
    );
  }
}
