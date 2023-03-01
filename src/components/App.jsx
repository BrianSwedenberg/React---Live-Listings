import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import AppAGServerSide from './AppAGServerSide';
import netlifyIdentity from 'netlify-identity-widget';
// import MetricGrid from './MetricGrid';
// import RefList from './RefList';
// import Dashboard from './Dashboard';
import PrivateRoutes from '../utils/PrivateRoutes';
import LoggedInNoUserRole from './LoggedInNoUserRole';
import 'bootstrap/dist/css/bootstrap.min.css';
import CumulDashboard from './CumulDashboard';
// import listingData from '../Data/SampleListingData.json';


function App() {  
  // const [cumul_auth_detail, set_cumul_auth_detail] = useState();

  // window.netfliyIdentity = netlifyIdentity;
  // netlifyIdentity.init();
  // const user = netlifyIdentity.currentUser();
  // console.log('app user - ', user)

  // const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/CumulioCredentials';
  // let user_info = {"username" : "brian_test", "name" : "brian swedenberg", "email" : "test@test.com", "suborg" : "test org"}

  // const getUserData_cumul = async () => {
  //   const auth_response = await fetch(apiURL, { method: 'POST', body: JSON.stringify(user_info) },);
  //   let auth_credentials = await auth_response.json();
  //   console.log('get user data app - ', auth_credentials)
  //   set_cumul_auth_detail(auth_credentials)
  // }

  // useEffect(() => {
  //   getUserData_cumul();
  // }, []);
  
  return(
    <Router>
      <Routes>
        {/*<Route element={<PrivateRoutes />}>
          <Route path='/' element={<AppAGServerSide />} />
        </Route>  
        {/*<Route path='/' element={<AppAGServerSide />} />  */}
        {/*<Route path='/' element={<RefList refs={listingObj}/>} />  */}
        <Route path='/' element={<AppAGServerSide cumul_auth_detail={cumul_auth_detail}/>} /> 
        <Route path='/loggedIn' element={<LoggedInNoUserRole />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<CumulDashboard cumul_auth_detail={cumul_auth_detail} />} />
         
      </Routes>
    </Router>

  );
}
export default App

