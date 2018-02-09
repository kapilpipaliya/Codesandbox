import * as React from 'react';
import * as classNames from 'classnames';
import { graphql, compose } from 'react-apollo';
import { Link } from 'mobx-little-router-react';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

import withFlashMessage from 'components/views/flash/withFlashMessage';
import { REVOKE_TOKEN } from 'mutations/auth/revokeTokenMutation';

const styles = (theme) => ({});

@withStyles(styles)
class Header extends React.Component {
  private logout(event: any) {
    event.preventDefault();
    this.props.revokeToken().then(response => {
      const errors = response.data.revokeToken.errors;
      if (!errors) {
        window.localStorage.removeItem('blog:token');
        (window as any).location = '/';
      }
    });
  }

  private renderSignInLinks() {
    const { currentUser, currentUserLoading } = this.props;
    if (currentUserLoading) {
      return null;
    }

    if (currentUser) {
      return (
        <div className="navbar-end">
          <Link className="navbar-item" to="/accountprofileedits/:id/edit">
            {/*currentUser.name*/}CURRENT_USER
          </Link>
          <a className="navbar-item" href="#logout" onClick={this.logout}>
            Logout
          </a>
        </div>
      );
    }

    return (
      <div className="navbar-end">
        <Link className="navbar-item" to="/accountsignups/new">
          Register
        </Link>
        <Link className="navbar-item" to="/accountsignins/new">
          Login
        </Link>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <>
          {this.renderSignInLinks()}
      </>
    );
  }
}
export default withFlashMessage(Header);
// const withRevokeToken = graphql(REVOKE_TOKEN, {
//   props: ({ mutate }) => ({
//     revokeToken() {
//       return mutate!({});
//     }
//   })
// });

// export default compose(withFlashMessage, withRevokeToken)(Header);
