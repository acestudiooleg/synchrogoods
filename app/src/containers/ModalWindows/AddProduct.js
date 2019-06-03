import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Modal from '../../components/Modal';
import modalWindowActions from '../../actions/modalWindow';
import productsActions from '../../actions/products';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  addNewProduct: product => {
    dispatch(productsActions.addItem(product));
    dispatch(modalWindowActions.closeModal());
  },
});

const AddProduct = props => {
  const { addNewProduct, closeModal } = props;
  const [product, setProducts] = useState({ title: '', description: '' });

  const okay = {
    title: 'Add',
    handler: () => addNewProduct(product),
  };

  const cancel = {
    title: 'Cancel',
    handleClose: closeModal,
  };
  const handleChange = name => event =>
    setProducts({ ...product, [name]: event.target.value });

  return (
    <Modal headerTitle="Add new product" cancel={cancel} okay={okay}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Title"
            value={product.title}
            onChange={handleChange('title')}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="desc"
            label="Desc"
            value={product.description}
            onChange={handleChange('description')}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

AddProduct.propTypes = {
  addNewProduct: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
AddProduct.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct);
