import React from 'react'
// import ReactDOM from 'react-dom/client'
import { useNavigate } from "react-router";
import netlifyIdentity from 'netlify-identity-widget'
import styled from 'styled-components';
import logoType from '../images/Logotype1.png';
import './LoggedIn.css'

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 100%;
  padding: 15px 45px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
  margin-left: 5px;
`

const logoutButtonPress = () => {
  // alert("button click");
  netlifyIdentity.logout();
}


const LoggedInNoUserRole = () => {
  const navigate = useNavigate();

  const handleLogout = (params) => {
    console.log('handle logout - ', params);
    navigate("/", { replace: true });
  }

  netlifyIdentity.on('login', user => handleLogin(user))
  netlifyIdentity.on('logout', user => handleLogout(user))

  return (
    <div className='LoginPanel'>
      <img src={logoType} class="logoType" />
      <hr class='horizontalLine' />
      <div className="TextContainer">
        You have successfully signed up! We will notify you by email once your account is approved for access.  If your account has been approved, please log out and log back in.
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