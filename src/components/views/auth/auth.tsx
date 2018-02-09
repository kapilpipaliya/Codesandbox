import * as React from 'react';
// import {withRouter} from 'react-router-dom';

/*
 * Example user object singleton that emits a change event
 * whenever its status changes.
 * import user from './user';
 */
const user = null;
const I = (InnerComponent) => React.createClass({
  checkAuth() {
    // Go to login route if user is not set.
    if (!user) {
      this.props.history.push('/login');
    }
  },
  componentDidMount() {
    // Check if user is authenticated on initial render
    this.checkAuth();

    // Check user object on change
    user.on('change', this.checkAuth);
  },
  componentWillUnmount() {
    // Remove our event listener
    user.off('change', this.checkAuth);
  },
  render() {
    // Render InnerComponent
    return (
      <InnerComponent />
    );
  }
});
// export default withRouter(I);
export default I;
// https://mariopabon.com/2016/02/15/sharing-code-between-react-components.html
