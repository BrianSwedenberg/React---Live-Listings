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

// netlifyIdentity.init({
//   container: '#netlify-modal', // defaults to document.body
//   locale: 'en' // defaults to 'en'
// });

// netlifyIdentity.open();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <head>
      <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </head>
    <body >
      
      <div data-netlify-identity-menu></div>
      <div data-netlify-identity-button>Login with Netlify Identity</div>
      <img src={logoType}/>
      {/* <h2 onClick={() => { console.log('login clicked ...') }}>Login</h2> */}
      <AppAGServerSide />
    </body>
	</React.StrictMode>
)