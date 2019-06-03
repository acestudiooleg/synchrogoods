export const close = 'close';
export const addProduct = 'addProduct';
export const editProduct = 'editProduct';
export const deleteProductConfirm = 'deleteProductConfirm';

export const modalWindow = {
  close,
  addProduct,
  editProduct,
  deleteProductConfirm,
};

export const types = {
  CHANGE_MODAL_WINDOW: 'MODAL_WINDOW/CHANGE',
};

const changeModalWindow = modalState => modalData => ({
  type: types.CHANGE_MODAL_WINDOW,
  payload: { modalState, modalData },
});

export default {
  changeModalWindow: changeModalWindow(),
  closeModal: changeModalWindow(close),
  addProductModal: changeModalWindow(addProduct),
  editProductModal: changeModalWindow(editProduct),
  deleteProductConfirmModal: changeModalWindow(deleteProductConfirm),
};
