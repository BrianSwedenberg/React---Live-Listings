import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
// import AppGraph from './components/AppGraph'
// import AppTable from './components/AppTable'
import AppAG from './components/AppAG'
import AppAGServerSide from './components/AppAGServerSide'
import logoType from './images/Logotype1.png'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <img src={logoType}/>
    <AppAG />
	</React.StrictMode>
)