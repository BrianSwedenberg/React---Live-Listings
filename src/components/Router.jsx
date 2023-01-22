import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import AppAGServerSide from './AppAGServerSide';
// import PrivateRoutes from '../utils/PrivateRoutes';
import LoggedInNoUserRole from './LoggedInNoUserRole';


function Router() {
  return(
    <Router>
      <Routes>
        {/* <Route element={<PrivateRoutes />}>
          {// <Route path='/' element={<AppAGServerSide />} />  }
        </Route> */}
        <Route path='/' element={<AppAGServerSide />} />  
        <Route path='/loggedIn' element={<LoggedInNoUserRole />} />
        <Route path='/login' element={<Login />} />
         
      </Routes>
    </Router>
  );
}
export default Router

