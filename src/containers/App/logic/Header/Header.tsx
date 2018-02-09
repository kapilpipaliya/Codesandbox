import * as React from 'react';
import * as classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import SessionControl from 'logic/_SessionControl'
import SessionDisplay from 'logic/_SessionDisplay'

const blue600 = blue[600];
const white = blue[50];
/*
import { withApollo } from 'react-apollo';
@withApollo
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    axios.delete('/users/sign_out').then(response => {
      if (response.status !== 204) {
        this.props.error("Oops, we're sorry, but something went wrong");
      } else {
        this.props.client.resetStore();
        this.props.redirect('/', { notice: 'Logout in successfully.' });
      }
    });
  }

  renderSignInLinks() {
    const { currentUser, currentUserLoading } = this.props;
    if (currentUserLoading) {
      return null;
    }

    if (currentUser) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/users/profile/edit">
              {currentUser.name}
            </Link>
          </li>
          <li>
            <a href="#logout" onClick={this.logout}>
              Logout
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/users/signup">Register</Link>
        </li>
        <li>
          <Link to="/users/signin">Login</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" title="GraphQL rails blog" to="/">
              GraphQL rails blog
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            {this.renderSignInLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

export default withFlashMessage(Header);
*/
const drawerWidth = 200;
const styles = (theme) => ({
  root: {
    width: '100%',
    // height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '@media print': {
      display: 'none',
    }
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  logo: {
    cursor: 'pointer',
    fontSize: 22,
    // color: props.textFullWhite,
    lineHeight: `${theme.spacing.desktopKeylineIncrement}px`,
    fontWeight: theme.typography.fontWeightLight,
    backgroundColor: blue600,
    paddingLeft: 40,
    height: 56,
  },
  menuItem: {
    color: white,
    fontSize: 14,
  },
  avatar: {
    div: {
      padding: '15px 0 20px 15px',
      // eslint-disable-next-line
      // backgroundImage: `url(${require('assets/images/material_bg.png')})`,
      height: 45,
    },
    icon: {
      float: 'left',
      display: 'block',
      marginRight: 15,
      boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)',
    },
    span: {
      paddingTop: 12,
      display: 'block',
      color: 'white',
      fontWeight: 300,
      textShadow: '1px 1px #444',
    },
  },
});

@withStyles(styles)
export default class Header extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar
        className={classNames(
          classes.appBar,
          this.props.open && classes.appBarShift
        )}
      >
        <Toolbar disableGutters={!this.state.open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.props.handleChangeRequestNavDrawer}
            className={classNames(
              classes.menuButton,
              this.props.open && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" noWrap>
            SCE JEWELERY
          </Typography>
          <SessionDisplay/>
          <SessionControl/>
        </Toolbar>
      </AppBar>
    );
  }
}
