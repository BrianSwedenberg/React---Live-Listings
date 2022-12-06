import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
// import AppGraph from './components/AppGraph'
// import AppTable from './components/AppTable'
import AppAG from './components/AppAG'
import AppAGGroup from './components/AppAGGroup'
import logoType from './images/Logotype1.png'
import AppAGServerSide from './components/AppAGServerSide'

export function initNetlifyIdentity() {
  console.log('netlify ID was called ...')
  const script = document.createElement('script');
  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js"
  script.async = true;

  document.body.appendChild(script)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <img src={logoType}/>
    <h2 onClick={() => {console.log('clicked')}}>Login</h2>
    <AppAGServerSide />
	</React.StrictMode>
)