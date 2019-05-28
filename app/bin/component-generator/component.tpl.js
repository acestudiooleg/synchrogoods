module.exports = (ComponentName, CapitalizedComponentName) =>
`import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import pure from 'src/decorators/pure';
import R from 'ramda';

import style from './${ComponentName}.css';

@pure
export default class ${CapitalizedComponentName} extends Component {
  static propTypes = {
    string: PropTypes.string,
    bool: PropTypes.bool,
    func: PropTypes.func
  };

  static defaultProps = {

  };

  render() {
    // const {} = this.props;
    return (<div>${CapitalizedComponentName}</div>);
  }
}`;
