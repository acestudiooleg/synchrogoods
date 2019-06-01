import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';

import ProductsList from '../containers/ProductsList';
import Sidebar from '../components/Sidebar';
import Toolbar from '../components/Toolbar';

class Home extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.array,
    category: PropTypes.object,
  };

  static defaultProps = {
    category: {
      title: 'ATB',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: false,
      isModalOpen: false,
    };
  }
  render() {
    const { classes, category } = this.props;
    return (
      <div>
        <Toolbar category={category} onOpenButtonClick={this.openSideBar} />
        <div className={classes.root}>
          <ProductsList onProductClick={this.openModal} />
        </div>
        <Sidebar
          isSideBarOpen={this.state.isSideBarOpen}
          onOpen={this.openSideBar}
          onClose={this.closeSideBar}
          onClick={this.closeSideBar}
        />
        <Fab
          color="secondary"
          aria-label="Add"
          onClick={this.openModal}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.isModalOpen}
            onClose={this.closeModal}
          >
            <div className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                Text in a modal
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
  closeSideBar = () => {
    this.setState({
      isSideBarOpen: false,
    });
  };
  openSideBar = () => {
    this.setState({
      isSideBarOpen: true,
    });
  };
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };
  handleClick() {}
}

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
});

export default withStyles(styles)(Home);
