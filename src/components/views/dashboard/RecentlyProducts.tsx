import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

/*
 * Import IconButton from 'material-ui/IconButton';
 * import MoreVertIcon from 'material-ui-icons/MoreVert';
 * import IconMenu from 'material-ui/IconMenu';
 */
import { cyan, grey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import Wallpaper from 'material-ui-icons/Wallpaper';

// Const grey400 = grey[400];
const cyan600 = cyan[600];
const white = grey[50];

const styles = (theme) => ({
  'root': theme.typography.button,
  'fontWeightMedium': theme.typography.fontWeightMedium,
  'fontWeightLight': theme.typography.fontWeightLight
});

const RecentlyProducts = (props) => {
  const styles1 = {
    'subheader': {
      'fontSize': 24,
      'fontWeight': props.fontWeightLight,
      'backgroundColor': cyan600,
      'color': white
    }
  };

  /*
   * Const iconButtonElement = (
   *   <IconButton
   *     touch
   *     tooltipPosition="bottom-left"
   *   >
   *     <MoreVertIcon color={grey400} />
   *   </IconButton>
   * );
   */

  /*
   * Const rightIconMenu = (
   *   <IconMenu iconButtonElement={iconButtonElement}>
   *     <MenuItem>View</MenuItem>
   *   </IconMenu>
   * );
   */

  return (
    <Paper>
      <List>
        <ListSubheader style={styles1.subheader}>Recent Products</ListSubheader>
        {props.data.map((item) => <div key={item.title}>
          <ListItem>
            <Avatar>
              <Wallpaper />
            </Avatar>
            <ListItemText primary={item.title} secondary={item.text} />
            {/* RightIconButton={rightIconMenu} */}
          </ListItem>
          <Divider inset />
        </div>)}
      </List>
    </Paper>
  );
};

export default withStyles(styles)(RecentlyProducts);
