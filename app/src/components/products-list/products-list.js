import React from 'react';
import List from '@material-ui/core/List';
import ProductListItem from '../products-list-item/products-list-item';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const ProductsList = props => {
  const { classes, products, onProductClick, onProductChange } = props;
  const items = products.map((p, i) => (
    <ProductListItem
      key={`listItem${i}`}
      product={p}
      onClick={onProductClick}
      onChange={onProductChange}
    />
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
  onProductClick: PropTypes.func,
  onProductChange: PropTypes.func,
};

ProductsList.defaultProps = {
  products: [],
  onProductClick: () => 1,
  onProductChange: () => 1,
};

const styles = () => ({});

export default withStyles(styles)(ProductsList);
