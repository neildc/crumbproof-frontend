import {
  brown600, brown800,
} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

const crustProofTheme = getMuiTheme({
  palette: {
    primary1Color: brown800,
    primary2Color: brown600,
  },
  appBar: {
    height: 50,
  },
});


export default crustProofTheme;
