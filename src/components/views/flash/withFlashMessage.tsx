import * as React from 'react';
import { pure, compose, lifecycle, withProps } from 'recompose';
import { graphql, compose } from 'react-apollo';
import { inject } from 'mobx-react';

import { CREATE_FLASH_MESSAGE } from 'mutations/flash/createFlashMessageMutation';
import { DELETE_FLASH_MESSAGE } from 'mutations/flash/deleteFlashMessageMutation';

// This HOC use two actions: error and notice.
export default function withFlashMessage(WrappedComponent) {
  class ComponentWithFlashMessage extends React.Component {
    constructor(props) {
      super(props);
      this.notice = this.notice.bind(this);
      this.error = this.error.bind(this);
      this.redirect = this.redirect.bind(this);
    }

    public notice(text: string) {
      this.props.createFlashMessage({ type: 'notice', text });
    }

    public error(text: string) {
      this.props.createFlashMessage({ type: 'error', text });
    }

    public deleteFlashMessage() {
      this.props.deleteFlashMessage();
    }

    public redirect(path: string, message) {
      this.props.router._history.push(path);
      if (message && message.error) {
        this.error(message.error);
      }
      if (message && message.notice) {
        this.notice(message.notice);
      }
    }

    public render() {
      return <WrappedComponent {...this.props} redirect={this.redirect} notice={this.notice} error={this.error} />;
    }
  }

  const withCreateFlashMessage = graphql(CREATE_FLASH_MESSAGE, {
    props: ({ mutate }) => ({
      createFlashMessage(message: FlashMessage) {
        return mutate!({ variables: { ...message } });
      }
    })
  });

  const withDeleteFlashMessage = graphql(DELETE_FLASH_MESSAGE, {
    props: ({ mutate }) => ({
      deleteFlashMessage() {
        return mutate!({});
      }
    })
  });
  
  return compose(
    withCreateFlashMessage,
    withDeleteFlashMessage,
    inject('router'),
  )(ComponentWithFlashMessage);
}
