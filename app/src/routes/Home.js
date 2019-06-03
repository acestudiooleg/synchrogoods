import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';

import modalWindowActions from '../actions/modalWindow';

import ProductsList from '../containers/ProductsList';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  addNewProduct: () => dispatch(modalWindowActions.addProductModal()),
});

class Home extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addNewProduct: PropTypes.func.isRequired,
  };

  static defaultProps = {};
  render() {
    const { classes, addNewProduct } = this.props;
    return (
      <div className={classes.root}>
        <ProductsList />
        <Fab
          color="secondary"
          aria-label="Add"
          onClick={addNewProduct}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const styles = () => ({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 99,
  },
});

export default R.pipe(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Home);
