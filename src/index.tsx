/**
 * App
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
// Use maximum configurable components.

import * as React from "react";
import * as ReactDOM from "react-dom";

// Mobx
import * as mobx from "mobx";
import { action, computed, observable, autorun, useStrict } from "mobx";
import { Provider } from "mobx-react";

// Styles
import All from "./config/Styles/styles";
import ThemeDefault from "./assets/stylesheets/theme-default";
const a = new All();
import { MuiThemeProvider } from "material-ui/styles";

// Apollo Client
import { ApolloProvider } from "react-apollo";
import client from "config/Apollo/apolloClient";

// Router
import { RouterProvider } from "mobx-little-router-react";
import { stores, router } from "stores/router";

// Other Global Config
import * as moment from "moment";
import * as momentLocalizer from "react-widgets-moment";
import * as simpleNumberLocalizer from "react-widgets-simple-number";

// Import root app
import App from "containers/App/index";

/**
 * Enables MobX strict mode globally.
 * In strict mode, it is not allowed to
 * change any state outside of an action
 */
// useStrict(true);
// Const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale("en");
// Moment.locale(locale);
momentLocalizer();
simpleNumberLocalizer();

window.store = router._store;
window.router = router;
window.mobx = mobx;
window.mainStore = stores;

router.start(() => {
  // router.push('/jobs')
  autorun(() => console.log(`path = ${router.location.pathname}`));
  // The <Outlet/> element outputs the matched route.
  // you can also use withRouter Decorators to injects router context into component props.
  ReactDOM.render(
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        <Provider {...stores} router={router}>
          <MuiThemeProvider theme={ThemeDefault}>
            <App />
          </MuiThemeProvider>
        </Provider>
      </RouterProvider>
    </ApolloProvider>,
    document.getElementById("root")
  );
});

// Removed withRouter from : withFlashMessage, auth

// };
/*
 * Not working in fuse-box...
 * // <LanguageProvider messages={messages}>
 * // </LanguageProvider>
 */
/*
 * No Redux please
 * <Provider store={store}>
 * ...everything..
 * </Provider>
 */

/*
 * Not needed in Fuse-box..
 * if (module.hot) {
 * // Hot reloadable React components and translation json files
 * // modules.hot.accept does not accept dynamic dependencies,
 * // have to be constants at compile-time
 * module.hot.accept(['./i18n', 'containers/App'], () => {
 * ReactDOM.unmountComponentAtNode(MOUNT_NODE);
 * render(translationMessages);
 * });
 * }
 */
/*
 * NOT Woriking in fuse..
 * // Chunked polyfill for browsers without Intl support
 * if (!window.Intl) {
 * (new Promise((resolve) => {
 * resolve(import('intl'));
 * }))
 * .then(() => Promise.all([
 * import('intl/locale-data/jsonp/en'),
 * ]))
 * .then(() => render(translationMessages))
 * .catch((err) => {
 * throw err;
 * });
 * } else {
 * render(translationMessages);
 * }
 */
/*
 * Not Awailable in Fuse-box.
 * // Install ServiceWorker and AppCache in the end since
 * // it's not most important operation and if main code fails,
 * // we do not want it installed
 * if (process.env.NODE_ENV === 'production') {
 * require('offline-plugin/runtime').install(); // eslint-disable-line global-require
 * }
 */
/*
 * I think I don't need service worker.
 * https://github.com/facebookincubator/create-react-app/issues/2398
 * import registerServiceWorker from './registerServiceWorker';
 * registerServiceWorker();
 */

/*
 * Removed Redux
 * // import { Provider } from 'react-redux';
 * // import configureStore from './configureStore';
 * // Create redux store with history
 * // const initialState = {};
 * // const store = configureStore(initialState, history);
 * // import { ConnectedRouter } from 'react-router-redux';
 */
