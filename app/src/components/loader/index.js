import React from 'react';
import {withStyles} from '@material-ui/core';


export const Loader = ({classes}) => (<div data-name="loader" className={classes.loading}/>);

const styles = ({palette: {black, white}}) => ({
  '@keyframes spin' : {
    '0%': {
      transform: 'rotate(0deg)',
    },
  
    '100%': {
      transform: 'rotate(360deg)',
    }
  },
  
  loading : {
    backgroundColor: black,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: 10000,
  
    '&::after' : {
      content: "\"",
      display: "block",
      borderRadius: "50%",
      width: '2rem',
      height: '2rem',
      border: `.25rem solid ${white}`,
      borderTopColor: white,
      animation: 'spin 1s infinite linear',
    }
  }
});

export default withStyles(styles)(Loader);
