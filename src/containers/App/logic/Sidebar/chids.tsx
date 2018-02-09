
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
  
  // private unsubscribeFromHistory: any;

  // public componentWillMount() {
  //   const { history } = this.props;
  //   this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
  //   this.handleLocationChange();
  // }

  // public componentWillUnmount() {
  //   if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  // }

  // public handleLocationChange = () => {
  //   this.props.deleteFlashMessage();
  // };

  
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


  render() {
    // console.log(this.state) // Drawer Open even if state is false..
    const { currentUser, currentUserLoading } = this.props;
    const { classes } = this.props;
    // layout is an array of objects, see the demo for more complete usage
    return (
      <div className={classes.root}>
      <Header currentUser={currentUser} currentUserLoading={currentUserLoading} />
      { false && <DevTools position={{ top: 0, left: 20 }}/> }
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
export default compose(
  withCurrentUser, 
  withFlashMessage, 
  // inject('router'),
  withStyles(styles))
  (PersistentDrawer);


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
 
/*
// import * as ReactGridLayout from 'react-grid-layout';
// import { WidthProvider, Responsive } from 'react-grid-layout';
// const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
*/