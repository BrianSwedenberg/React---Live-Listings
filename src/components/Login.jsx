import React from 'react'
import ReactDOM from 'react-dom/client'
import netlifyIdentity from 'netlify-identity-widget'
import styled from 'styled-components';

window.netfliyIdentity = netlifyIdentity;
const user = netlifyIdentity.currentUser();

// // netlifyIdentity.open();
// netlifyIdentity.init();

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  padding: 15px 60px;
  border-radius: 5px;
  font-size: 36px
`

const buttonPress = () => {
  alert("button click")
}


const Login = () => {
  return (
    <div>
      <Button onClick={buttonPress}>
        Log In  
      </Button>
    </div>
  );
};

export default Login