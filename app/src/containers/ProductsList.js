import { connect } from 'react-redux';
import ProductsList from '../components/ProductsList';
import { getProducts } from '../reducers/products';

const mapStateToProps = state => ({
  products: getProducts(state),
});

const mapActionsToProps = () => ({});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ProductsList);
