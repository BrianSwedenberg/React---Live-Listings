import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import AppAGServerSide from './AppAGServerSide';
import MetricGrid from './MetricGrid';
import RefList from './RefList';
import Dashboard from './Dashboard';
// import PrivateRoutes from '../utils/PrivateRoutes';
import LoggedInNoUserRole from './LoggedInNoUserRole';
import 'bootstrap/dist/css/bootstrap.min.css';
import listingData from '../Data/SampleListingData.json';


function App() {  
  return(
    <Router>
      <Routes>
        {/* <Route element={<PrivateRoutes />}>
          {// <Route path='/' element={<AppAGServerSide />} />  }
        </Route> } 
        <Route path='/' element={<AppAGServerSide />} />  */}
        {/*<Route path='/' element={<RefList refs={listingObj}/>} />  */}
        <Route path='/' element={<AppAGServerSide />} /> 
        <Route path='/loggedIn' element={<LoggedInNoUserRole />} />
        <Route path='/login' element={<Login />} />
         
      </Routes>
    </Router>

  );
}
export default App

