/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import * as React from 'react';
// import { Route, Switch, Link } from 'react-router-dom';
import { Link } from 'mobx-little-router-react'
import { pure, compose, lifecycle, withProps } from 'recompose';
import { inject } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import * as classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { blue } from 'material-ui/colors';

// import DevTools from 'mobx-react-devtools'

import {menuHash} from 'app/routes';
import SideBarList from 'components/views/sidebarlist';

import FlashMessage from 'components/structures/flash/FlashMessage';
import Header from 'logic/Header/Header';

// import withCurrentUser from "queries/users/currentUserQuery";

import HomePage from 'containers/App/home_page'
// import HomePage from 'containers/DashboardPage'
import { install, Outlet, RouterProvider } from 'mobx-little-router-react'
import * as ReactGridLayout from 'react-grid-layout';
import { WidthProvider, Responsive } from "react-grid-layout";
import * as map from 'lodash/map';
import { observer, Observer } from 'mobx-react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const blue600 = blue[600];
const white = blue[50];
const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    width: '100%',
    // height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    // overflow: 'hidden',

  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
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
    '@media print': {
      display: 'none',
    }
  },
  // https://developer.mozilla.org/en-US/Apps/Progressive/Responsive/Media_types
  drawerInner: {
    '@media print': {
      display: 'none',
    }
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
    // backgroundColor: theme.palette.background.default,
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
    // Only Required if we not set display: 'none', to side-bar
    // '@media print': {
    //   marginLeft: -drawerWidth,
    // }
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

class PersistentDrawer extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    // this.setState({ open: true });
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    // this.setState({ open: false });
    this.setState({ open: !this.state.open });
  };
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.width !== nextProps.width) {
  //     this.setState({ navDrawerOpen: nextProps.width === 'sm' });
  //   }
  // }

  // componentDidMount() {
  //   const that = this;
  //
  //   Backend.getUsers().then(
  //     (response) => {
  //       that.setState({ friends: response.data });
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //
  //   // Try to load user next
  //   Facebook.IsLoggedIn().then(
  //     (response) => {
  //       // console.log("Facebook Response", response);
  //       that.setToken(response);
  //
  //       // console.log("loading feed")
  //       Facebook.Me().then(
  //         (response) => {
  //           // console.log('Feed response', response);
  //           that.setUser(response);
  //         },
  //         (err) => {
  //           console.log('feed error', err);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  //
  // setUser(user) {
  //   this.setState({
  //     user: {
  //       picture: user.picture.data.url,
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       name: user.first_name,
  //       gender: user.gender,
  //       age_range: user.age_range,
  //     },
  //   });
  // }
  //
  // setToken(token) {
  //   this.setState({ token: token.accessToken, uid: token.uid });
  // }
  //
  //
  // login() {
  //   const that = this;
  //   Facebook.Login().then(
  //     (response) => {
  //       console.log('Login response', response);
  //       this.setToken(response);
  //
  //       Facebook.Me().then(
  //         (response) => {
  //           that.setUser(response);
  //         },
  //         (err) => {
  //           console.log('Facebook Profile Error', err);
  //         }
  //       );
  //     },
  //     (err) => {
  //       console.log('Facebook Login Error', err);
  //     }
  //   );
  // }
  //
  // logout() {
  //   // console.log("App.logout()")
  //   Facebook.Logout().then(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  //  <DevTools position={{ top: 0, left: 20 }}/>
  render() {
    // console.log(this.state) // Drawer Open even if state is false..
    const { classes } = this.props;
    // layout is an array of objects, see the demo for more complete usage
    return (
      <div className={classes.root}>

        <div className={classes.appFrame}>
          <Header
            open={this.state.open}
            handleChangeRequestNavDrawer={this.handleDrawerOpen}
          />
          {/*We have to set display: 'none', to Drawer*/}
          <Drawer
            variant="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <div style={styles.logo}>
              <Link to="/">Home</Link>
              </div>
              <Divider />
              <SideBarList />
              <Divider />
              <List className={classes.list}>
                {/* {otherMailFolderListItems} */}
              </List>
              
            </div>
          </Drawer>

          <main
            className={classNames(
              classes.content,
              this.state.open && classes.contentShift
            )}
          >
            {/* <Header currentUser={currentUser} currentUserLoading={currentUserLoading} /> */}
            {/* <Header  /> */}
            <FlashMessage />
              
            <Outlet />
            <AddRemoveLayout/>



            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}


    // <Route exact path="/" component={HomePage} />
    
        // <Route path="*" component={NotFound} />

const P = withStyles(styles)(PersistentDrawer);
// export default withCurrentUser(PersistentDrawer);
export default P;


// <div style={styles.avatar.div}>
//  {this.props.user ?
//    <Avatar
//      src={this.props.user.picture}
//      size={50}
//      style={styles.avatar.icon}
//    />
//    : <Avatar
//      icon={<Person/>}
//      size={50}
//      style={styles.avatar.icon}
//    />
//  }
//  <span style={styles.avatar.span}>{this.props.user ? this.props.user.name : 'Guest'}</span>
// </div>


// header props
// {/*styles={styles.header}*/}
// {/*// user={this.state.user}*/}
// {/*// onLogin={this.login.bind(this)}*/}
// {/*// onLogout={this.logout.bind(this)}*/}





/*

              <Route exact path="/" component={HomePage} />
              <Switch>
                {Object.keys(menuHash).map((k) =>
                  menuHash[k].array.map((route) => (
                    <Route path={route.path} component={route.component} />
                  )))}
                
            
              </Switch>
*/

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 * Use CSSTransition on elements.
 */
@observer
class AddRemoveLayout extends React.Component {
  render() {
  console.log(this.props.GridLayoutStore.layout.toJS())
    
    return (
      <div>
        <ResponsiveReactGridLayout
          onLayoutChange={this.props.GridLayoutStore.onLayoutChange}
          onBreakpointChange={this.props.GridLayoutStore.onBreakpointChange}
          {...this.props}
        >
          {this.props.GridLayoutStore.layout.map(el => this.props.GridLayoutStore.createElement(el))}
          
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
AddRemoveLayout = compose(
  
  inject('GridLayoutStore')
)(AddRemoveLayout);