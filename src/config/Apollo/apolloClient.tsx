// Apollo Client Setup =============================
/*
 * Import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'; Increase Performance.
 * http://dev.apollodata.com/core/network.html
// ApolloClient is the center of using GraphQL in your app! It manages all of your data so you can focus on features!
 */
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DedupLink } from 'apollo-link-dedup';

import { authLink, formatErrorsLink, onErrorLink, link, queryOrMutationLink1, SubscriptionLink1, requestLink } from './links';
// import fetch from 'node-fetch';
import { flashMessageLocalLink } from './flashMessageLocalLink';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  }
}

export default new ApolloClient({
  // 'link': link,
  link: ApolloLink.from([
    // new DedupLink(),
    // queryOrMutationLink1({
    //   fetch,
    //   'uri': `${ROOT_URL}/graphql`
    // })
    onErrorLink,
    authLink,
    formatErrorsLink,
    flashMessageLocalLink,
    link
    ]),
  'cache': new InMemoryCache(),
  'queryDeduplication': true,
  'ssrMode': true,
  defaultOptions,
  // 'dataIdFromObject': (result) => {
  //   /* eslint no-underscore-dangle: 0 */
  //   if (result.id && result.__typename) {
  //     return result.__typename + result.id;
  //   }
  //   return null;
  // }
  // Other options like cache
});


// Apollo Client Setup End =============================