import React, { useState, useEffect } from 'react';
import listingData from '../Data/SampleListingData.json';
import TTButton from './TTButton';
import MetricGrid from './MetricGrid';
import RefList from './RefList';
import RefInputForm from './RefInputForm';



function Dashboard(props) {
  const listing_data_empty = {"Current" : [], "Last30" : [], "Empty": true};
  const listing_data_file = listingData['Listings'];
  const [listingDataState, setListingData] = useState();
  const [fullRef, setFullRef] = useState();
  const [baseRef, setBaseRef] = useState();
  const [brandID, setBrandID] = useState();
  const [excludeMarketplace, setMarketplace] = useState();

  useEffect(() => {
    // console.log('useEffect - setting state empty');
    setListingData(listing_data_empty);
    setFullRef('');
    setMarketplace(false);
  }, []);

  // console.log('Dashboard props - ', props)
  
  const getListingData = async () => {
    let listing_obj = {"Current" : [], "Last30" : [], "Empty": false};
    const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchRefDetail-Request';
    
    let queryParamsCurrent = {"brandID" : brandID, "baseRef" : baseRef, "num_of_days" : 0};
    const currentResponse = await fetch(apiURL, { method: 'POST', body: JSON.stringify(queryParamsCurrent) },);
    let listing_current_holder = await currentResponse.json();
    listing_obj['Current'] = listing_current_holder.listings;

    let queryParamsLast30 = {"brandID" : brandID, "baseRef" : baseRef, "num_of_days" : 30};
    const last30Response = await fetch(apiURL, { method: 'POST', body: JSON.stringify(queryParamsLast30) },);
    let listing_30_holder = await last30Response.json();
    listing_obj['Last30'] = listing_30_holder.listings;

    setListingData(listing_obj);
    
        // .then(response => response.json())
        // .then(response => console.log(response))
        // .then(response => (listing_obj_empty['Current'] = reponse['listings']))
        // .then(console.log('end of getlistingdata function - ', listing_obj_empty))
    // return resposne;
    // console.log(data)
  }

  const handleButtonClick = () => {
    console.log('button clicked, brandID, baseRef - ', brandID, baseRef);
    getListingData();
    // let dataTest = getListingData();
    // setListingData(dataTest);
    setFullRef('');
    
  }

  const handleRefClick = (fullRef) => {
    console.log('ref clicked', fullRef, typeof(fullRef));
    setFullRef(fullRef);
    console.log(fullRef);
    
  }

  const clearFullRef = () => {
    console.log('ref cleared');
    setFullRef('');    
  }

  const handleBrandChange = (event) => {
    console.log('dashboard brand change');
    console.log(event.target.value);
    setBrandID(event.target.value);
  }

  const handleBaseRefChange = (event) => {
    console.log('dashboard base ref change');
    console.log(event.target.value);
    setBaseRef(event.target.value);
  }

  const handleMarketplaceChange = (event) => {
    // console.log('dashboard marketplace change', excludeMarketplace == true);
    setMarketplace(!excludeMarketplace);
  }
  
  return (
    <div className="dashboard">
      <div className="jumbotron">
        <h1 className="display-4">Reference Detail</h1>
        <hr className="my-4"/>
      </div>
      
      <div className="control-box">
        <div className="button-box">
          <TTButton text='Search' onClick={handleButtonClick} />
        </div>
        <div className="input-box">          
          {/*<TTDropdown  /> */}
          <RefInputForm 
            onBrandChange={(brand) => handleBrandChange(brand)} 
            onBaseRefChange={(baseRef) => handleBaseRefChange(baseRef)}
            onMarketplaceChange={(marketplace) => handleMarketplaceChange(marketplace)}
            isOn={excludeMarketplace}
            />
        </div>
      </div>
      <div className="data-box">
        <div className="ref-list">
          <div className="ref-list-title">Full Reference Variants</div>
          <RefList listings={listingDataState} onClear={clearFullRef} onClick={(ref) => handleRefClick(ref)} />
        </div>
        <div className="metric-grid">
          <MetricGrid 
            listings={listingDataState} 
            fullRef={fullRef}
            excludeMarketplace={excludeMarketplace}
          />
        </div>
      </div>
    </div>
  )
};

export default Dashboard;