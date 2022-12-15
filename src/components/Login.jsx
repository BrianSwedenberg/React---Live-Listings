import React from 'react'
// import ReactDOM from 'react-dom/client'
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router";
import netlifyIdentity from 'netlify-identity-widget'
import styled from 'styled-components';
import logoType from '../images/Logotype1.png';
import './Login.css'

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 100%;
  padding: 15px 45px;
  border-radius: 5px;
  font-size: 24px;
  margin-right: 5px;
  margin-left: 5px;
`
const loginButtonPress = () => {
  // alert("button click");
  netlifyIdentity.open('login');
}

const signUpButtonPress = () => {
  // alert("button click");
  netlifyIdentity.open('signup');
}

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = (params) => {
    console.log('handle login - ', params);  
    navigate("/", { replace : true});
  }

  netlifyIdentity.on('login', user => handleLogin(user))
  
  return (
    <div className='LoginPanel'>
      <img src={logoType} class="logoType" />
      <hr class='horizontalLine' />
      <div className="ButtonContainer">
        <Button onClick={loginButtonPress}>
          Log In
        </Button>
        <Button onClick={signUpButtonPress}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login