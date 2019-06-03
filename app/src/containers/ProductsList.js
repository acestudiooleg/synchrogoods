import { connect } from 'react-redux';
import ProductsList from '../components/ProductsList';
import productsAction from '../actions/products';
import { getProductsList } from '../reducers/products';

const mapStateToProps = state => ({
  products: getProductsList(state),
});

const mapActionsToProps = dispatch => ({
  onProductCheck: product => dispatch(productsAction.updateItem(product)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ProductsList);
