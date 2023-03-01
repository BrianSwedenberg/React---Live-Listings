import { CumulioDashboardComponent } from '@cumul.io/react-cumulio-dashboard';
import { useRef, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

function CumulDashboard(props){
  const ref = useRef(null);
  const [cumul_auth_detail, set_cumul_auth_detail] = useState();

  // window.netfliyIdentity = netlifyIdentity;
  // netlifyIdentity.init();
  // const user = netlifyIdentity.currentUser();
  // console.log('dashboard user - ', user)
  // console.log('dashboard user info - ', user.id, user.email, user.user_metadata.full_name)
  // const [auth_details, set_auth_details] = useState();
  
  useEffect(() => {
    getUserData();
  }, []);
  
  // console.log('user info dashboard - ', user_info)

  const getUserData = async () => {
    window.netfliyIdentity = netlifyIdentity;
    netlifyIdentity.init();
    const user = netlifyIdentity.currentUser();
    
    const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/CumulioCredentials';
    let user_info = {"username" : user.id, "name" : user.user_metadata.full_name, "email" : user.email, "suborg" : "test org"};
    
    const auth_response = await fetch(apiURL, { method: 'POST', body: JSON.stringify(user_info) },);
    let auth_credentials = await auth_response.json();
    console.log('get user data dashboard - ', auth_credentials);
    set_cumul_auth_detail(auth_credentials);
  }

  
  console.log('cumul auth details - ', cumul_auth_detail)

  // const auth_key = cumul_auth_detail['id']
  // const auth_token = cumul_auth_detail['token']
  // var auth_var = {  
  //   key: '0314b491-9298-48da-9029-57e2e2b9bac4',
  //   token: 'hW1gkbkFXZvtafwQ0H0u7vE0gHzXGWsnlgZUVkwtP5s4an0MM5AZedF998f8FxGhZwE4Vyhmc8NtdWcGmjJJn2BGnZQteHtmFXWftINc1La9fOzVZV5Qgix6Ck5BytYGxPk51ZCF5tXnVYDXMc0nCG',
  //   host: 'https://api.us.cumul.io'
  // };
  // console.log(auth_details['id']);
  // console.log(auth_details['token']);
  // console.log('props details - ', props.cumul_auth_detail)
  return (
    <div>
      <CumulioDashboardComponent
          ref={ref}
          // authKey={cumul_auth_detail.id}
          // authKey={props.auth_key}
          // authKey={auth_key}
          // authToken={cumul_auth_detail.token}
          // authToken={props.auth_token}
          // authToken={auth_token}
          // dashboardId = 
          dashboardSlug="livelistingtestdashboard"
          ///dashboardId = "eb8a3bec-2d19-4229-b40a-2f31ad379780"
          // switchScreenModeOnResize={false}
          loaderSpinnerColor="rgb(0, 81, 126)"
          loaderSpinnerBackground="rgb(236 248 255)"
          itemsRendered={(e) => console.log('itemsRendered', e)}
          appServer="https://app.us.cumul.io/"
        ></CumulioDashboardComponent>
    </div>
  )
}

export default CumulDashboard