import R from 'ramda';
import {isEqual} from 'lodash';
import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Loader from '../../components/loader';

const mapState = (state, props) => ({
  loaded: state.page[props.name]
});

const mapActions = dispatch => ({
  triggerLoaded: ({name}) => dispatch({type: 'driverapp/PAGE_LOADED', name}),
  onChange: ({name, wait}) => dispatch({type: 'driverapp/PAGE_CHANGE', name, wait}),
  onOpen: ({name, payload}) =>
    dispatch({type: `driverapp/PAGE_${name}_OPEN`, payload: {...payload, name}}),
  unload: ({name}) => dispatch({
    type: 'driverapp/PAGE_UNLOADED',
    name
  })
});


export class Internal extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    exactly: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    wait: PropTypes.bool,
    loaded: PropTypes.bool,
    payload: PropTypes.object,

    triggerLoaded: PropTypes.func,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    unload: PropTypes.func
  }

  static defaultProps = {
    name: 'UNNAMED',
    wait: false
  }

  trigger(props) {
    this.props.onChange(props);
    this.props.onOpen(props);
  }

  componentWillMount() {
    this.trigger(this.props);
  }

  componentWillUpdate(props) {
    if (!isEqual(props.payload, this.props.payload)) {
      if (props.payload.url === this.props.payload.url &&
          props.payload.isExact !== this.props.payload.isExact) {
        this.props.onChange(props);
        this.props.triggerLoaded(props);
      } else {
        this.trigger(props);
      }
    }
  }

  componentWillUnmount() {
    this.props.unload(this.props);
  }

  render() {
    const {wait, loaded, payload, component} = this.props;
    return wait && !loaded ?
      <div className={style.loader}><Loader/></div> :
      React.createElement(component, payload.params);
  }
}

export  class Page extends Component {
  renderRoute = (payload) => {
    payload.params = payload.match.params;
    const transformedPayload = Object.assign(payload, payload.match);
    return <Internal payload={transformedPayload} {...this.props}/>;
  }

  render() {
    const props = R.omit([
      'onChange', 'onOpen', 'validate',
      'state', 'name', 'component'
    ], this.props);

    return <Route {...props} render={this.renderRoute}/>;
  }
}


export default connect(mapState, mapActions)(Page);