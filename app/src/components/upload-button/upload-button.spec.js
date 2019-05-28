import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import UploadButton from './upload-button';

const defaultProps = {
  input: {
    value: '',
    onChange: () => {}
  }
};

const propsWithPicture = {
  input: {
    value: 'base64:picture',
    onChange: () => {}
  }
};

const setup = (props = defaultProps) => {
  const holder = shallow(<UploadButton {...props}/>);
  return {
    holder,
    error: holder.find('[data-name="error"]'),
    uploadInput: holder.find('[data-name="uploadInput"]'),
    ...(props.input && props.input.value ? {
      deleteButton: holder.find('[data-name="delete"]'),
      pictureThumbnail: holder.find('img')
    } : {
      fileButton: holder.find('[data-name="fileBtn"]')
    })
  };
};

test('render upload button', t => {
  const {fileButton, uploadInput} = setup();

  t.is(uploadInput.length, 1);
  t.is(fileButton.length, 1);
});

test('render thumbnail', t => {
  const {pictureThumbnail, uploadInput} = setup(propsWithPicture);

  t.is(uploadInput.length, 1);
  t.is(pictureThumbnail.length, 1);
  t.is(pictureThumbnail.prop('src'), propsWithPicture.input.value);
});

test('remove picture', t => {
  const onChange = sinon.spy();
  const {deleteButton} = setup({input: {...propsWithPicture.input, onChange}});

  deleteButton.simulate('click');

  t.is(onChange.args[0][0], '');
});

test('on fileButton click', t => {
  const onClick = sinon.spy();

  const {fileButton} = setup({...defaultProps, onClick});

  fileButton.simulate('click');

  t.true(onClick.calledOnce);
});

test('should save value to hidden input', t => {
  const {uploadInput} = setup(propsWithPicture);

  t.is(uploadInput.prop('value'), propsWithPicture.input.value);
});

test('should not represent error by default', t => {
  const {error} = setup();

  t.is(error.length, 0);
});

test('should represent error', t => {
  const errorMessage = 'Error';
  const {error, fileButton} = setup({
    ...defaultProps,
    meta: {touched: true, error: errorMessage}
  });

  t.is(error.length, 1);
  t.is(error.text(), errorMessage);
  t.is(fileButton.prop('color'), 'orange-red');
});
