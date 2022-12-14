import { Outlet, Navigate } from 'react-router-dom'
import netlifyIdentity from 'netlify-identity-widget'

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();
var user_metadata = {}; 
var user_roles = {};

if (user == null ) { console.log('null user'); }
else{  
  console.log('user not null')
  user_metadata = user['app_metadata']; 
  user_roles = user_metadata['roles']; 
  // console.log(user)
  // console.log(user_metadata)
  // console.log(user_roles)
  // console.log(typeof user_roles)
}

let auth = false;
if (typeof user_roles == 'undefined' || user_roles == null ) { console.log('undefined user roles') }
// else if (user_roles.includes('TestUser')) { 
else { 
  // {auth=true}; 
  // console.log('auth is true');
  console.log('user_roles exists');
}

const PrivateRoutes = () => {
  console.log('private routes');
  return(
    auth ? <Outlet /> : <Navigate to='/login' />
  );
}
export default PrivateRoutes