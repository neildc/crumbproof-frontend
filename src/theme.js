import {
    brown600, brown800,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
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
