import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/styles';
const CategoriesListItem = props => {
  const { classes, category } = props;
  return (
    <div className={classes.listItem}>
      <ListItem divider>
        <ListItemText primary={category.title} />
      </ListItem>
    </div>
  );
};

CategoriesListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.object,
};

const styles = () => ({});

export default withStyles(styles)(CategoriesListItem);
