import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import DragIcon from '@material-ui/icons/DragIndicator';
import Checkbox from '@material-ui/core/Checkbox';

const ProductsListItem = props => {
  const { classes, product, onClick, onChange } = props;
  return (
    <div className={classes.listItem}>
      <ListItem onClick={onClick} divider>
        <ListItemIcon>
          <DragIcon />
        </ListItemIcon>
        <ListItemText primary={product.title} />
        <ListItemSecondaryAction>
          <Checkbox edge="end" onChange={onChange} checked={product.isDone} />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

ProductsListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const styles = () => ({});

export default withStyles(styles)(ProductsListItem);
