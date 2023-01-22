import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import AppAGServerSide from './AppAGServerSide';
// import PrivateRoutes from '../utils/PrivateRoutes';
import LoggedInNoUserRole from './LoggedInNoUserRole';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Live Listing Grid" component={AppAGServerSide} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}
export default App

