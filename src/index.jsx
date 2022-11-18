import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
// import AppGraph from './components/AppGraph'
// import AppTable from './components/AppTable'
import AppAG from './components/AppAG'
import AppAGServerSide from './components/AppAGServerSide'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppAG />
	</React.StrictMode>
)