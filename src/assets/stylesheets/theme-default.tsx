import {createMuiTheme} from 'material-ui/styles';
import {blue, cyan, green, grey, orange, pink, purple} from 'material-ui/colors';

/*
 * Import Assessment from 'material-ui-icons/Assessment';
 * import Face from 'material-ui-icons/Face';
 * import ThumbUp from 'material-ui-icons/ThumbUp';
 * import ShoppingCart from 'material-ui-icons/ShoppingCart';
 */
const blue600 = blue[600];
const grey900 = grey[900];
const lightGreenA700 = green[700];

// other way to write:
// scej-graphql/app/lerna/packages/scej-client/node_modules/material-ui/es/styles/createMuiTheme.d.ts
// const theme = createMuiTheme({ palette, typography, overrides });

const themeDefault = createMuiTheme({
  'overrides': {
    // 'MuiButton': {
    //   // Name of the styleSheet
    //   'root': {
    //     // Name of the rule
    //     'background': 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //     'borderRadius': 3,
    //     'border': 0,
    //     'color': 'white',
    //     'height': 48,
    //     'padding': '0 30px',
    //     'boxShadow': '0 3px 5px 2px rgba(255, 105, 135, .30)'
    //   }
    // },
    // 'MuiInput': {
    //   'root': {
    //     'color': 'chocolate',
    //     'fontSize': 'large'
    //   }
    // },
    // 'MuiInputLabel': {'root': {'color': 'black'}},
    // 'MuiGrid': {

    //   /*
    //   * TypeContainer: {
    //   *   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //   * },
    //   * 'spacing-xs-24': {
    //   *   padding: '0 2px 0 0',
    //   * },
    //   */
    // }
  },

  /*
   * Palette: {
   * },
   */
  'appBar': {
    'height': 57,
    'color': blue600
  },
  'drawer': {
    'width': 230,
    'color': grey900
  },
  'slider': {
    'trackSize': 5,
    'trackColor': lightGreenA700,
    'trackColorSelected': lightGreenA700,

    /*
     * HandleColorZero: "#bdbdbd",
     * handleFillColor: "#ffffff",
     */
    'handleSize': 18,
    'handleSizeActive': 24,
    'handleSizeDisabled': 8

    /*
     * RippleColor: "#00bcd4",
     * rippleColor: "#ed20f7"
     * selectionColor: "#00bcd4"
     * selectionColor: "#ed20f7"
     */
  }
});


export default themeDefault;


// Is there a way to share styles between components? I have two components that create the same styles using withStyles(). I don't want to repeat this code!

// Tyler Hughes @TylerLH 09:38
// export the style itself and import into both components
// if you need to extend it use something like Object.assign({}, styles, { width: 100 })
// Or even better...

/*
const MaterialIcon = ({ icon, icnColr}, {}) => {
            switch (icon) {
                case 'RemoveIcon': return <RemoveIcon style={{ fill: icnColr }} />
                case 'ComputerIcon': return <ComputerIcon style={{ fill: icnColr }} />
                case 'FaceIcon': return <FaceIcon style={{ fill: icnColr }} />
                default: return null
            }
        };
would like to collapse this with e.g.

return <{icon) style={{ fill: icnColr }}
but my syntax is incorrect for {icon} which is a string.

*/