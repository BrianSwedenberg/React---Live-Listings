import { Outlet, Navigate } from 'react-router-dom'
import netlifyIdentity from 'netlify-identity-widget'

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();
var user_metadata = null; 
var user_roles = null;

if (user == null ) { console.log('null user'); }
else{  
  console.log('user not null');
  user_metadata = user['app_metadata']; 
  user_roles = user_metadata['roles']; 
  // console.log(user)
  // console.log(user_metadata)
  // console.log(user_roles)
  // console.log(typeof user_roles)
}

let auth = false;
if (user_roles == null ) { console.log('undefined user roles') }
else if (user_roles.includes('TestUser')) { 
  {auth=true}; 
  console.log('auth is true');
  console.log('user_roles exists');
  console.log(user_roles);
}



const PrivateRoutes = () => {
  console.log('private routes');
  return(
    auth ? <Outlet /> : <Navigate to='/login' />
  );
}
export default PrivateRoutes