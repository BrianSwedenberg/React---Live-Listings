import { Outlet, Navigate } from 'react-router-dom'
import netlifyIdentity from 'netlify-identity-widget'

window.netfliyIdentity = netlifyIdentity;
netlifyIdentity.init();
const user = netlifyIdentity.currentUser();
const user_metadata = user['app_metadata']; 
const user_roles = user_metadata['roles']; 

let auth = false;


const PrivateRoutes = () => {
  if (typeof user != 'undefined' ) {
    if (user_roles.includes('TestUser')) {
      {auth=true};   
    }
  }
  
  return(
    auth ? <Outlet /> : <Navigate to='/login' />
  );
}
export default PrivateRoutes