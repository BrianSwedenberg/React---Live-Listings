import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import AppAGServerSide from './AppAGServerSide';
import PrivateRoutes from '../utils/PrivateRoutes'


function App() {
  return(
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<AppAGServerSide />} />  
        </Route>
        <Route path='/login' element={<Login />} />
         
        {/*  <Route path='/' element={<AppAGServerSide/>} />
          <Route path='/login' element={<Login />} /> */}
      </Routes>
    </Router>
  );
}
export default App

