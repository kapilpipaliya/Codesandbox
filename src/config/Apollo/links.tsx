import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { BatchHttpLink } from "apollo-link-batch-http";

import { WebSocketLink } from 'apollo-link-ws';
import * as ActionCable from 'actioncable';
import * as ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

import { getMainDefinition } from 'apollo-utilities';

import { split } from 'apollo-link';

import {ROOT_URL, SUBSCRIPTION_URL} from './rootUrl';
import formatErrors from 'utils/errorsUtils';
import client from './apolloClient';

import {CREATE_FLASH_MESSAGE} from 'mutations/flash/createFlashMessageMutation';

// Create an http link:
export const batchHttpLink = new BatchHttpLink({
  uri: `${ROOT_URL}/graphql`
});
const cable = ActionCable.createConsumer(`${SUBSCRIPTION_URL}/subscriptions`);

// Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:5000/`,
//   options: {
//     reconnect: true
//   }
// });

// const hasSubscriptionOperation = ({ query: { definitions } }) => {
//   return definitions.some(
//     ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
//   )
// }

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
export const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  // hasSubscriptionOperation,
  // wsLink,
  new ActionCableLink({cable}),
  batchHttpLink,
);


export const authLink = setContext((_, previousContext) => {
  const token = localStorage.getItem('blog:token');
  return {
    headers: {
      // ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

export const onErrorLink = onError(({graphQLErrors, networkError}) => {
  /*
   * OnError receives a callback in the event a GraphQL or network error occurs.
   * This example is a bit contrived, but in the real world, you could connect
   * a logging service to the errorLink or perform a specific action in response
   * to an error.
   */
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export const formatErrorsLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    // Add format errors properties to payload if an error is happend
    for (const operationName of Object.keys(response.data)) {
      const payload = response.data[operationName];
      if (payload && payload.messages && payload.messages.length > 0) {
        response.data[operationName].errors = formatErrors(payload.messages);
        if (payload.errors.base) {
          error(payload.errors.base);
        } else {
          error('Please review the problems below:');
        }
      }
    }
    return response;
  });
});

const error = (text) => {
  client.mutate({ mutation: CREATE_FLASH_MESSAGE, variables: { type: 'error', text } });
};


export const subscriptionLink1 = (config = {}) => new WebSocketLink({
  'uri':
      process.env.NODE_ENV !== 'production'
        ? 'ws://localhost:3010/subscriptions'
        : 'wss://api.githunt.com/subscriptions',
  'options': {'reconnect': true},
  ...config
});

export const queryOrMutationLink1 = (config = {}) => new ApolloLink((operation, forward) => {

  /*
   * You can use a simple middleware link like this one to set credentials,
   * headers, or whatever else you need on the context.
   * All links in the chain will have access to the context.
   */
  operation.setContext({'credentials': 'same-origin'});

  return forward(operation);
}).concat(new HttpLink({...config}));

export const requestLink = ({queryOrMutationLink, subscriptionLink}) => ApolloLink.split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  subscriptionLink,
  queryOrMutationLink
);
