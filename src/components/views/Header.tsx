import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
// Import IconMenu from 'material-ui/IconMenu';
import { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu from 'material-ui-icons/Menu';
import ViewModule from 'material-ui-icons/ViewModule';
import { grey } from 'material-ui/colors';
import SearchBox from './SearchBox';

const white = grey[50];

// Import Facebook from '../models/facebook';

class Header extends React.Component {
  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      'appBar': {
        'position': 'fixed',
        'top': 0,
        'overflow': 'hidden',
        'maxHeight': 57
      },
      'menuButton': {'marginLeft': 10},
      'iconsRightContainer': {'marginLeft': 20}
    };

    // Console.log("Header Props", this.props);

    return (
      <div>
        <AppBar 
          style={{
          ...styles,
          ...style.appBar
          }}
        >
          <Toolbar>

            <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
              <Menu color={white} />
            </IconButton>
            <SearchBox />
            <div style={style.iconsRightContainer}>
              <IconButton color={white}>
                <IconButton><ViewModule color={white} /></IconButton>
                {this.props.user ? null : <MenuItem key={1} primaryText="Login with Facebook" onClick={this.props.onLogin} />}
                {this.props.user ? <MenuItem key={2} primaryText="Logout" onClick={this.props.onLogout} /> : null}
              </IconButton>
              <IconButton color={white}>
                <IconButton><MoreVertIcon color={white} /></IconButton>
                <MenuItem primaryText="Sign out" containerElement={<Link to="/login" />} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  'styles': PropTypes.object,
  'handleChangeRequestNavDrawer': PropTypes.func
};

export default Header;
