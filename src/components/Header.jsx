import React from 'react'
import logoType from '../images/Logotype1.png';
import styled from 'styled-components';
import './Header.css';

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 12%;
  padding: 8px 30px;
  border-radius: 5px;
  font-size: 17px;
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