import { Outlet, Navigate } from 'react-router-dom'
import netlifyIdentity from 'netlify-identity-widget'

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();
if (user == null ) { console.log('null user'); }
else{  
  const user_metadata = user['app_metadata']; 
  const user_roles = user_metadata['roles']; 
  console.log(user)
  console.log(user_metadata)
  console.log(user_roles)
  console.log(typeof user_roles)
}

let auth = false;

const PrivateRoutes = () => {
  if (typeof user_roles == 'undefined' ) { console.log('undefined user roles') }
  else if (user_roles.includes('TestUser')) { {auth=true}; }
  
  return(
    auth ? <Outlet /> : <Navigate to='/login' />
  );
}
export default PrivateRoutes