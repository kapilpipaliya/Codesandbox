/* eslint-disable */
import * as React from 'react';

//import HomePage from './containers/HomePage/Loadable';
// import NotFoundPage from './containers/NotFoundPage/Loadable';
//import NotFound from './components/views/NotFound';



import SearchAccounts from 'containers/user/accounts/All/SearchAccounts';
import NewAccount from 'containers/user/accounts/NewEdit/NewAccount';
import EditAccount from 'containers/user/accounts/NewEdit/EditAccount';
import Account from 'containers/user/accounts/Preview/Account';
import AllAccounts from 'containers/user/accounts/All/AllAccounts';

import NewAccountSignUp from 'containers/user/account_sign_ups/NewEdit/NewAccountSignUp';

import NewAccountSignIn from 'containers/user/account_sign_ins/NewEdit/NewAccountSignIn';

import EditAccountProfileEdit from 'containers/user/account_profile_edits/NewEdit/EditAccountProfileEdit';


import All from 'components/views/RouterPage/All'
// import Dashboard from 'containers/DashboardPage';
import { computed, reaction } from 'mobx';
import * as UrlPattern from 'url-pattern';

const _orgRoute = '/org/:orgId';
const _pageRoute = _orgRoute + '/:page';
export const pageRoute = new UrlPattern(_pageRoute);
const _connectorEditPattern = _pageRoute + '/:connectorId(/:slug)';
export const connectorEditRoute = new UrlPattern(_connectorEditPattern);

const routes = [pageRoute, connectorEditRoute];

export const menuHash = {
  // @formatter:off

  User: {
    show: true,
    icon: 'abe.jpg',
    color: 'green',
    array: [

      {show: false, icon: 'ade.jpg', path: '/accounts/search/:keywords', display_name: 'Search Accounts', component: SearchAccounts, },
      {show: false, icon: 'ade.jpg', path: '/accounts/new', display_name: 'New Account', component: NewAccount, },
      {show: false, icon: 'ade.jpg', path: '/accounts/:id/edit', display_name: 'Edit Account', component: EditAccount,},
      {show: false, icon: 'ade.jpg', path: '/accounts/:id', display_name: 'Account ID', component: Account,},
      {show: true, icon: 'ade.jpg', path: '', display_name: 'Accounts', component: AllAccounts, },

      {show: false, icon: 'ade.jpg', path: '/accountsignups/new', display_name: 'Sign Up', component: NewAccountSignUp, 'header' : true},

      {show: false, icon: 'ade.jpg', path: '/accountsignins/new', display_name: 'Sign In', component: NewAccountSignIn, 'header' : true},

      {show: false, icon: 'ade.jpg', path: '/accountprofileedits/:id/edit', display_name: 'Account Settings', component: EditAccountProfileEdit,},

    ],
  },
  // @formatter:on
};

//export default (
//  <Switch>
//    <Route exact path="/" component={HomePage} />
//    {Object.keys(menuHash).map((k) =>
//      menuHash[k].array.map((route) => (
//        <Route path={route.path} component={route.component} />
//      )))}
//    
//    <Route path="*" component={NotFound} />
//  </Switch>
//);
