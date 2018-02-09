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