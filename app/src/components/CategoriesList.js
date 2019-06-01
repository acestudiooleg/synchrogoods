import React from 'react';
import List from '@material-ui/core/List';
import CategoriesListItem from './CategoriesListItem';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const CategoriesList = props => {
  const { classes, categories } = props;
  const items = categories.map((c, i) => (
    <CategoriesListItem key={`listItem${i}`} category={c} />
  ));

  return (
    <div className={classes.list}>
      <List component="nav">{items}</List>
    </div>
  );
};

CategoriesList.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array,
};

CategoriesList.defaultProps = {
  categories: [],
};

const styles = () => ({});

export default withStyles(styles)(CategoriesList);
