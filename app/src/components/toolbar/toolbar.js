import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import TrashIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';

const Toolbar = props => {
  const { classes, category, onOpenButtonClick } = props;

  return (
    <div className={classes.toolbar}>
      <AppBar position="static">
        <MUIToolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onOpenButtonClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {category.title}
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="Delete all">
            <TrashIcon />
          </IconButton>
        </MUIToolbar>
      </AppBar>
    </div>
  );
};

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.object.isRequred,
  onOpenButtonClick: PropTypes.func.isRequred,
};

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
});

export default withStyles(styles)(Toolbar);
