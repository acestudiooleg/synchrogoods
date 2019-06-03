import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

import { getModalWindowState } from '../../reducers/modalWindow';
import modalWindowActions, {
  addProduct,
  close,
} from '../../actions/modalWindow';

import AddProduct from './AddProduct';

const mapStateToProps = state => ({
  modalWindowState: getModalWindowState(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(modalWindowActions.closeModal()),
});

const modalWindowComponents = {
  [addProduct]: <AddProduct />,
};

export const ModalWindows = props => {
  const { modalWindowState, closeModal } = props;
  const isModalOpen = modalWindowState !== close;
  if (!isModalOpen) {
    return null;
  }
  return (
    <Dialog disableBackdropClick handleClose={closeModal} open={isModalOpen}>
      {modalWindowComponents[modalWindowState]}
    </Dialog>
  );
};

ModalWindows.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalWindowState: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalWindows);
