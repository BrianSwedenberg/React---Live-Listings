import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import AppAGServerSide from './AppAGServerSide';



function App() {
  return(
    <Router>
      <Routes>
          <Route path='/' element={<AppAGServerSide/>} />
          <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App

