import * as React from 'react';
// import { createBrowserHistory } from 'history'
import createBrowserHistory from 'mobx-history/createBrowserHistory';
// import {BrowserRouter} from 'react-router-dom'; // It Includes history.
import { install, Outlet} from 'mobx-little-router-react'
import createStores from 'stores'
import {menuHash} from 'config/Routes/routes';



const listItems = []


Object.keys(menuHash).forEach((k) => 
  menuHash[k].array.forEach((item) => (
    listItems.push(item)
  ))
);

export const stores = createStores()
// stores.SessionStore.client = client
export const router = install({
  history: createBrowserHistory(),
  routes: listItems, 
  
  getContext: () => ({
    stores
  }),
  
})