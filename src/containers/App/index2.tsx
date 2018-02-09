import * as React from 'react';

import Sidebar from 'logic/Sidebar';
import Header from 'logic/Header/_Header';
import Footer from 'logic/Footer/_Footer';
import Router from 'logic/Router/_Router';

export default class  extends React.Component {
  render() {
    return (
      <>
<div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
  <header style={{background: 'red'}}>
    <Header />
  </header>
  
  
  <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
    <main style={{flex: 2, background: 'blue'}}>
      <Router />
    </main>
    <aside style={{background: 'pink'}}>
      <Sidebar />
    </aside>
  </div>
  
  
  <footer style={{background: 'red', marginTop: 'auto'}}>
    <Footer />
  </footer>
</div>
      </>
    )
  }
}