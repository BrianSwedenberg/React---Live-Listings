import React from 'react'
import ReactDOM from 'react-dom/client'
import netlifyIdentity from 'netlify-identity-widget'
import styled from 'styled-components';
import logoType from '../images/Logotype1.png';
import './Login.css'

window.netfliyIdentity = netlifyIdentity;
const user = netlifyIdentity.currentUser();

// // netlifyIdentity.open();
// netlifyIdentity.init({
//   container: '#netlify-modal', // defaults to document.body
//   locale: 'en' // defaults to 'en'
// });

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 100%;
  padding: 15px 45px;
  border-radius: 5px;
  font-size: 24px;
`

const buttonPress = () => {
  alert("button click");
  netlifyIdentity.open();
}


const Login = () => {
  return (
    <div className='LoginPanel'>
      <img src={logoType} class="logoType"/>
      <hr class='horizontalLine' />
      <div className="ButtonContainer">
        <Button onClick={buttonPress}>
          Log In  
        </Button>
      </div> 
    </div>
  );
};

export default Login