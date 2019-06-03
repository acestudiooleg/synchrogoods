import React from 'react';
import R from 'ramda';
import List from '@material-ui/core/List';
import ProductListItem from './ProductsListItem';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const ProductsList = props => {
  const { classes, products, onProductEdit, onProductCheck } = props;
  const items = products.map((p, i) => (
    <ProductListItem key={`listItem${i}`} product={p} onEdit={onProductEdit} onCheck={onProductCheck} />
  ));

  return (
    <div className={classes.list}>
      <List component="nav">{items}</List>
    </div>
  );
};

ProductsList.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array,
  onProductEdit: PropTypes.func,
  onProductCheck: PropTypes.func,
};

ProductsList.defaultProps = {
  products: [],
  onProductEdit: R.identity,
  onProductCheck: R.identity,
};

const styles = () => ({});

export default withStyles(styles)(ProductsList);
