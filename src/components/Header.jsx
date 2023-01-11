import React from 'react'
import { useNavigate } from "react-router";
import netlifyIdentity from 'netlify-identity-widget';
import logoType from '../images/Logotype1.png';
import styled from 'styled-components';
import './Header.css';

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 9%;
  padding: 8px 24px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`

const logoutButtonPress = () => {
  // alert("logout");
  netlifyIdentity.logout();
}


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = (params) => {
    console.log('handle logout - ', params);
    navigate("/", { replace: true });
    window.location.reload(true);
  }

  netlifyIdentity.on('logout', user => handleLogout(user))

  return (
    <nav>
      <div className='div-header'>
        <div className='div-logo'>
          <img src={logoType} class="header-logo" />
        </div>
        <Button onClick={logoutButtonPress}>
          Log Out
        </Button>
      </div>
    </nav>
  )
}

export default Header