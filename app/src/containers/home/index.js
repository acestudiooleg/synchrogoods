import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Modal from '@material-ui/core/Modal';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';

import MenuIcon from '@material-ui/icons/Menu';
import TrashIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DragIcon from '@material-ui/icons/DragIndicator';
import DoneIcon from '@material-ui/icons/Done';
import { withStyles } from '@material-ui/styles';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: false,
      isModalOpen: false,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.toolbar}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.openSideBar}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Goods List
              </Typography>
              <IconButton edge="start" color="inherit" aria-label="Delete all">
                <TrashIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.root}>
          <List component="nav">
            <ListItem onClick={this.openModal} divider>
              <ListItemIcon>
                <DragIcon />
              </ListItemIcon>
              <ListItemText primary="Potatos" />
              <ListItemSecondaryAction>
                <Checkbox edge="end" onChange={this.handleClick} checked />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <DragIcon />
              </ListItemIcon>
              <ListItemText primary="Oranges" />
              <ListItemSecondaryAction>
                <Checkbox edge="end" onChange={this.handleClick} checked />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <DragIcon />
              </ListItemIcon>
              <ListItemText primary="Potatos" />
              <ListItemSecondaryAction>
                <Checkbox edge="end" onChange={this.handleClick} checked />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <DragIcon />
              </ListItemIcon>
              <ListItemText primary="Oranges" />
              <ListItemSecondaryAction>
                <Checkbox edge="end" onChange={this.handleClick} checked />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
        <Fab
          color="secondary"
          aria-label="Add"
          onClick={this.openModal}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
        <SwipeableDrawer
          open={this.state.isSideBarOpen}
          onClose={this.closeSideBar}
          onOpen={this.openSideBar}
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={this.closeSideBar}
          >
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map(text => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
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
  toolbar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
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
