import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: { main: teal[500] }, // Purple and green play nicely together.
    secondary: { main: purple[500] }, // This is just green.A700 as hex.
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
