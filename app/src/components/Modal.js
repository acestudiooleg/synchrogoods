import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconLeft from '@material-ui/icons/ChevronLeft';

const ModalButtonProps = PropTypes.shape({
  title: PropTypes.node.isRequired,
  handler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
});

export class Modal extends PureComponent {
  static propTypes = {
    back: ModalButtonProps,
    cancel: ModalButtonProps,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    customFooter: PropTypes.node,
    customHeader: PropTypes.node,
    headerTitle: PropTypes.string,
    isLoading: PropTypes.bool,
    okay: ModalButtonProps,
  };

  static defaultProps = {
    back: null,
    cancel: null,
    customFooter: null,
    customHeader: null,
    headerTitle: null,
    isLoading: false,
    okay: null,
  };
  render() {
    const { classes, children } = this.props;

    return (
      <Grid>
        <Grid className={classes.edge}>{this.renderHeader()}</Grid>
        <Grid className={classes.body}>{children}</Grid>
        <Grid className={classes.edge}>{this.renderFooter()}</Grid>
      </Grid>
    );
  }

  renderHeader = () => {
    const { classes, customHeader, headerTitle } = this.props;
    if (customHeader) {
      return customHeader;
    }

    return (
      <Typography variant="h1" className={classes.title}>
        {headerTitle}
      </Typography>
    );
  };

  renderFooter = () => {
    const { customFooter, okay, cancel, back } = this.props;
    if (customFooter) {
      return customFooter;
    }

    return (
      <Grid container justify="space-between">
        <Grid item>{back && this.renderBackButton(back)}</Grid>
        <Grid item>
          {cancel && this.renderCancelCancel(cancel)}
          {okay && this.renderOkButton(okay)}
        </Grid>
      </Grid>
    );
  };

  renderBackButton = ({ title, handler }) => {
    const { classes } = this.props;
    return (
      <Button className={classes.button} onClick={handler}>
        <IconLeft className={classes.backIcon} />
        {title}
      </Button>
    );
  };

  renderCancelCancel = ({ title, handler }) => {
    const { classes } = this.props;
    return (
      <Button className={classes.button} onClick={handler}>
        {title}
      </Button>
    );
  };

  renderOkButton = ({ title, handler, disabled }) => {
    const { classes, isLoading } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handler}
        disabled={disabled || isLoading}
        className={classes.button}
      >
        {isLoading ? 'loading' : title}
      </Button>
    );
  };
}

const styles = theme => ({
  edge: {
    backgroundColor: theme.palette.grey[200],
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  body: {
    minWidth: 500,
    padding: theme.spacing.unit * 2,
  },
  title: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 12,
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
  },
  backIcon: {
    width: '0.5em',
    height: '0.5em',
  },
});

export default withStyles(styles)(Modal);
