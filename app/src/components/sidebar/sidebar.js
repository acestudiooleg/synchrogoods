import React from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/styles';

import CategoriesList from '../categories-list/categories-list';

const Sidebar = props => {
  const {
    classes,
    categories,
    isSideBarOpen,
    onOpen,
    onClose,
    onClick,
  } = props;

  return (
    <div className={classes.sidebar}>
      <SwipeableDrawer open={isSideBarOpen} onClose={onClose} onOpen={onOpen}>
        <div className={classes.list} role="presentation" onClick={onClick}>
          <CategoriesList categories={categories} />
        </div>
      </SwipeableDrawer>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array,
  isSideBarOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

Sidebar.defaultProps = {
  categories: [],
  onOpen: () => 1,
  onClose: () => 1,
  onClick: () => 1,
};

const styles = () => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default withStyles(styles)(Sidebar);
