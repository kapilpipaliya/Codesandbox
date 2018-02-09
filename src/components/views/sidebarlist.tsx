import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import { Link } from 'mobx-little-router-react';

import { menuHash } from 'config/Routes/routes';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    '&:hover': {
      opacity: 0.85,
    },
  },
});

class NestedList extends React.Component {
  state = { Mfg: true };

  handleClick = (k) => {
    this.setState({ [k]: !this.state[k] });
  }

  render() {
    const { classes } = this.props;

    const listItems = Object.keys(menuHash).map((k) => [
      <ListItem key={k} button onClick={() => this.handleClick(k)}>
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText inset primary={k} />
        {this.state[k] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>,
      <Collapse key={`COLL${k}`} in={this.state[k]} timeout="auto" unmountOnExit>
        {menuHash[k].array.map((item) => (
          item.show ?
            <Link key={item.display_name} to={item.path} href="#main">
              <ListItem button className={classes.nested} style={{background: item.color}}>
                <ListItemIcon><SendIcon /></ListItemIcon>
                <ListItemText inset primary={item.display_name} />
              </ListItem>
            </Link> : null
        ))}
      </Collapse>,
    ]);
    return (
      <List className={classes.root} subheader={<ListSubheader>Masters:</ListSubheader>}>
        {listItems}
      </List>
    );
  }
}

export default withStyles(styles)(NestedList);
