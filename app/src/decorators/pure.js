import PureRenderMixin from 'react-addons-pure-render-mixin';
import {decorate} from './helpers';

export default target => decorate(target, class extends target {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = this::PureRenderMixin.shouldComponentUpdate;
  }
});
