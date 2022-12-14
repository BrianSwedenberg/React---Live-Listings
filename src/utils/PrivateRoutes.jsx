import { Outlet, Navigate } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';

const PrivateRoutes = () => {

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
    console.log(user)
    // console.log(user_metadata)
    // console.log(user_roles)
    // console.log(typeof user_roles)
  }
  
  let auth = { approved: false , user : false };
  if (user_metadata != null ) { 
    // console.log('undefined user roles')
    auth.user = true;
  }
  if (user_roles != null) {
    if (user_roles.includes('Approved')) { 
      auth.approved = true; 
      // console.log('user_roles exists');
      // console.log(user_roles);
    }
  }
  
  console.log('auth - ', auth);
  // console.log('user info - ', user);
  if ( auth.user ) {
    return(
      auth.approved ? <Outlet /> : <Navigate to='/loggedIn'/>
    );
  }
  else {
    return(
      <Navigate to='/login'/>
    );
  }
}
export default PrivateRoutes