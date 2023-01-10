import React from 'react'
// import ReactDOM from 'react-dom/client'
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router";
import netlifyIdentity from 'netlify-identity-widget'
import logoType from '../images/Logotype1.png';
import './LoggedIn.css'

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();

const logoutButtonPress = () => {
  // alert("button click");
  netlifyIdentity.logout();
}


const LoggedInNoUserRole = () => {
  const navigate = useNavigate();
  
  const handleLogin = (params) => {
    console.log('handle login - ', params);  
    navigate("/", { replace : true});
  }

  netlifyIdentity.on('login', user => handleLogin(user))
  netlifyIdentity.on('logout', user => handleLogout(user))
  
  return (
    <div className='LoginPanel'>
      <img src={logoType} class="logoType" />
      <hr class='horizontalLine' />
      <div className="TextContainer">
        You have successfully signed up! We will notify you by email once your account is approved for access.
      </div>
      <div className="ButtonContainer">
        <Button onClick={logoutButtonPress}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default LoggedInNoUserRole