import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
// import AppGraph from './components/AppGraph'
// import AppTable from './components/AppTable'
import AppAG from './components/AppAG'
import AppAGGroup from './components/AppAGGroup'
import logoType from './images/Logotype1.png'
import AppAGServerSide from './components/AppAGServerSide'
import netlifyIdentity from 'netlify-identity-widget'

window.netfliyIdentity = netlifyIdentity;

const user = netlifyIdentity.currentUser();
netlifyIdentity.open();
netlifyIdentity.on('init', user => console.log('init', user));
netlifyIdentity.on('login', user => console.log('login', user));
netlifyIdentity.on('logout', () => console.log('Logged out'));
netlifyIdentity.on('error', err => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));

// // netlifyIdentity.open();
// netlifyIdentity.init();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      
      <img src={logoType}/>
      {/* <h2 onClick={() => { console.log('login clicked ...') }}>Login</h2> */}
      <AppAGServerSide />
    
	</React.StrictMode>
)