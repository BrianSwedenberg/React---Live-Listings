import { CumulioDashboardComponent } from '@cumul.io/react-cumulio-dashboard';
import { useRef } from 'react';



function CumulDashboard(){
  const ref = useRef(null);
  var client = {  
    api_key: 'a7e3c1d9-11f0-4ee4-aa42-30c75d8ef4db',
    api_token: 'qfhl8vII8ZS8Vo8pyVFbh3tRfDTXkh3YW3eIzd0CXtzKj9RIvQKhofQc2qwiZwtOogPnm8lK5SL5wA4Jz0GbY2fObbh5oXrpZgCdlEamxdeiHekTIRodbPiXzOsEiLbWCjZyvWw3XmkvkHKBtXElhE',
    host: 'https://api.us.cumul.io'
  };
  console.log(client['api_key']);
  console.log(client['api_token']);
  return (
    <div>
      <CumulioDashboardComponent
          ref={ref}
          authKey={client['api_key']}
          authToken={client['api_token']}
          dashboardSlug="livelistingtestdashboard"
          // dashboardId = "eb8a3bec-2d19-4229-b40a-2f31ad379780"
          switchScreenModeOnResize={false}
          loaderSpinnerColor="rgb(0, 81, 126)"
          loaderSpinnerBackground="rgb(236 248 255)"
          itemsRendered={(e) => console.log('itemsRendered', e)}
          appServer="https://app.us.cumul.io/"
        ></CumulioDashboardComponent>
    </div>
  )
}

export default CumulDashboard