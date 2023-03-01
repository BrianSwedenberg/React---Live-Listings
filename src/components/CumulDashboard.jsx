import { CumulioDashboardComponent } from '@cumul.io/react-cumulio-dashboard';
import { useRef, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

function CumulDashboard(props){
  const ref = useRef(null);

  window.netfliyIdentity = netlifyIdentity;
  netlifyIdentity.init();
  const user = netlifyIdentity.currentUser();
  console.log('dashboard user - ', user)
  // const [auth_details, set_auth_details] = useState();
  
  // const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/CumulioCredentials';
  // let user_info = {"username" : "brian_test", "name" : "brian swedenberg", "email" : "test@test.com", "suborg" : "test org"}

  // const getUserData = async () => {
  //   const auth_response = await fetch(apiURL, { method: 'POST', body: JSON.stringify(user_info) },);
  //   let auth_credentials = await auth_response.json();
  //   console.log('get user data - ', auth_credentials)
  //   set_auth_details(auth_credentials)
  // }

  // useEffect(() => {
  //   getUserData();
  // }, []);
  // console.log(auth_details)

  // const auth_key = props.auth_key
  // const auth_token = props.auth_token
  // var auth_var = {  
  //   key: '0314b491-9298-48da-9029-57e2e2b9bac4',
  //   token: 'hW1gkbkFXZvtafwQ0H0u7vE0gHzXGWsnlgZUVkwtP5s4an0MM5AZedF998f8FxGhZwE4Vyhmc8NtdWcGmjJJn2BGnZQteHtmFXWftINc1La9fOzVZV5Qgix6Ck5BytYGxPk51ZCF5tXnVYDXMc0nCG',
  //   host: 'https://api.us.cumul.io'
  // };
  // console.log(auth_details['id']);
  // console.log(auth_details['token']);
  console.log(props.cumul_auth_detail)
  return (
    <div>
      <CumulioDashboardComponent
          ref={ref}
          authKey={props.auth_key}
          // authKey={auth_var.key}
          authToken={props.auth_token}
          //authToken={auth_var.token}
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