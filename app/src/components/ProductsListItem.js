import React from 'react';
import cx from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import DragIcon from '@material-ui/icons/DragIndicator';
import Checkbox from '@material-ui/core/Checkbox';

const ProductsListItem = props => {
  const { classes, product, onEdit, onCheck } = props;
  const { title, description, isDone } = product;
  const onProductCkeck = p => () => onCheck({ ...p, isDone: !p.isDone });
  const itemCSS = cx({ [classes.checkedItem]: isDone });
  const primaryTextCSS = { primary: isDone ? classes.checkedTitle : '' };
  return (
    <div className={classes.listItem}>
      <ListItem className={itemCSS} onDoubleClick={onEdit} divider>
        <ListItemIcon>
          <DragIcon />
        </ListItemIcon>
        <ListItemText classes={primaryTextCSS} primary={title} secondary={!isDone && description} />
        <ListItemSecondaryAction>
          <Checkbox edge="end" onChange={onProductCkeck(product)} checked={isDone} />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

ProductsListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

const styles = ({ palette: { grey } }) => ({
  checkedItem: {
    backgroundColor: grey[200],
  },
  checkedTitle: {
    textDecoration: 'line-through',
    color: grey[500],
  },
});

export default withStyles(styles)(ProductsListItem);
