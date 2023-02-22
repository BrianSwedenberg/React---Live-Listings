import { CumulioDashboardComponent } from '@cumul.io/react-cumulio-dashboard';
import { useRef } from 'react';



function CumulDashboard(){
  const ref = useRef(null);
  var client = {
    api_key: '53fe9d57-f8b3-424f-a745-fb2589d656b5',
    api_token: 'zqMvaOpJrRxjVjoVIWxKiEUZPtgR52UBXO3S8oh9vmpAIwk2MxO64CKmqq6V5LkVQQ6dK4tfyOC3ancMOySqfxzfVQPd5ssjAYBasspWdPcCgoydIzwJ92jY14fHFtrQEwAixQladN4EIJdvghErjZ',
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
          switchScreenModeOnResize={false}
          loaderSpinnerColor="rgb(0, 81, 126)"
          loaderSpinnerBackground="rgb(236 248 255)"
          itemsRendered={(e) => console.log('itemsRendered', e)}
        ></CumulioDashboardComponent>
    </div>
  )
}

export default CumulDashboard