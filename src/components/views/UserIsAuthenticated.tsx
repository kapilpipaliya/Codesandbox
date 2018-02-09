import * as React from 'react';
import { compose } from 'react-apollo';

import withFlashMessage from 'components/views/flash/withFlashMessage';
import withCurrentUser from 'queries/users/currentUserQuery';

export default function UserIsAuthenticated(WrappedComponent) {
  class ComponentUserIsAuthenticated extends React.Component {
    constructor(props) {
      super(props);
      this.redirectIfUserIsNotAuthenticated = this.redirectIfUserIsNotAuthenticated.bind(this);
    }

    public componentWillMount() {
      this.redirectIfUserIsNotAuthenticated();
    }

    public componentWillReceiveProps(nextProps) {
      this.redirectIfUserIsNotAuthenticated(nextProps);
    }

    private redirectIfUserIsNotAuthenticated(props) {
      const { currentUser, currentUserLoading } = props || this.props;
      if (!currentUserLoading && !currentUser) {
        this.props.redirect('/accountsignins/new', {
          error: 'You need to sign in or sign up before continuing.'
        });
      }
    }

    public render() {
      const { currentUser, currentUserLoading } = this.props;
      if (currentUserLoading || !currentUser) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return compose(withCurrentUser, withFlashMessage)(ComponentUserIsAuthenticated);
}
