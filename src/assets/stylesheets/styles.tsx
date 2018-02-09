// Import { withStyles } from 'material-ui/styles';
import {grey} from 'material-ui/colors';
const ctrl = 'f6 link dim br2 ba bw1 ph3 pv2 mv2 mr1 dib b--light-gray bg-white light-red';
const fctrl = 'f5 link dim bn dib mid-gray bg-transparent light-red';

const grey600 = grey[600];

/*
 * Const styles = theme => ({
 *   root: theme.typography.button,
 *   fontWeightMedium: theme.typography.fontWeightMedium,
 *   fontWeightLight: theme.typography.fontWeightLight,
 * });
 */

const styles = {
  ctrl,
  fctrl,

  'navigation': {
    'fontSize': 15,
    // FontWeight: typography.fontWeightLight,
    'fontWeight': 300,
    'color': grey600,
    'paddingBottom': 15,
    'display': 'block'
  },
  'title': {
    'fontSize': 24,
    // FontWeight: typography.fontWeightLight,
    'fontWeight': 300,
    'marginBottom': 20
  },
  'paper': {'padding': 30},
  'clear': {'clear': 'both'}
};

export default styles;
