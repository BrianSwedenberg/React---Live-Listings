import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import RefListItem from './RefListItem';
// import listingData from '../Data/SampleListingData.json';
import './Dashboard.css'

// const listingsObj = listingData['Listings']
// let fullRefs = listingsObj.Current.map(listing => listing.FullRef).concat(listingsObj.Last30.map(listing => listing.FullRef))

function RefList(props) {
  console.log('RefList props - ', props);
  let distinctFullRefs = []
  if (props.listings){
    const listingsObj = props.listings
    const fullRefs = listingsObj.Current.map(listing => listing.FullRef).concat(listingsObj.Last30.map(listing => listing.FullRef))
    // console.log(fullRefs)
    distinctFullRefs = [...new Set(fullRefs)]
    // console.log(distinctFullRefs)
  }
 
  const renderRefList = distinctFullRefs.map((ref) => {
    return (
      // <RefListItem onClick={() => handleRefClick(ref)}>{ref}</RefListItem>
      // <RefListItem>Include all variants</RefListItem>  
      <RefListItem isTitle={false} onClick={() => props.onClick(ref)}>{ref}</RefListItem>
    )
  })  
  
  return (
    <div className="refList">
    <ListGroup id="listGroup" action>
      <RefListItem onClick={props.onClear} isTitle={true} listLength={distinctFullRefs.length}>Include all variants</RefListItem>  
      {renderRefList}
    </ListGroup>
    </div>
  );
}

export default RefList;