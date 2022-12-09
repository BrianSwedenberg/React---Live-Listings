import React from 'react'
import ReactDOM from 'react-dom/client'
import netlifyIdentity from 'netlify-identity-widget'

window.netfliyIdentity = netlifyIdentity;
const user = netlifyIdentity.currentUser();

// // netlifyIdentity.open();
// netlifyIdentity.init();

const Login = () => {
  return (
    <div>
      <h1>
        This is the login page - we will place the widget here.
      </h1>
    </div>
  );
};

export default Login