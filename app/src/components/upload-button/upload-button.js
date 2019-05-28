/* eslint react/jsx-no-bind: 0 */
import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import pure from 'src/decorators/pure';
import R from 'ramda';
import Button from 'src/components/button/button';
import styles from './upload-button.css';

@pure
export default class UploadButton extends Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string
    }),
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: R.identity,
    meta: {
      touched: false,
      error: ''
    }
  }

  renderButton() {
    const {meta: {touched, error}, onClick} = this.props;
    const isError = touched && error;

    return (
      <div>
        <Button
          onClick={onClick}
          data-name="fileBtn"
          caption="Upload Picture"
          color={isError ? 'orange-red' : ''}
          />
        {isError &&
          <em data-name="error" className={cx(styles.errorMessage)}>{error}</em>
        }
      </div>
    );
  }

  renderThumbnail() {
    const {input: {value, onChange}} = this.props;
    const removePicture = () => onChange('');

    return (
      <section className={cx(styles.thumbnail)}>
        <img src={value}/>
        <Button
          onClick={removePicture}
          data-name="delete"
          caption="Delete"
          icon="close"
          nocaption
          />
      </section>
    );
  }

  render() {
    const {input} = this.props;

    return (
      <div data-name="uploadButton">
        {input.value ? ::this.renderThumbnail() : ::this.renderButton()}
        <input data-name="uploadInput" type="hidden" {...input}/>
      </div>
    );
  }
}
