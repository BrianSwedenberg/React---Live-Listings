import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import {Container} from 'semantic-ui-react'
// import ListingItemList from './ListingItemList'
import ListingCardList from './ListingCardList'


// Hard coded static Listing for testing purposes
/*
const listings = [
  {
    listingID : 1234,
    brandName : 'Rolex',
    familyName : 'Submariner',
    platformName : 'EBAY',
    listPrice : '$24,500',
    imageLink : 'https://cdn2.chrono24.com/images/uhren/16200599-4qmlxkfjx2yxlogf92r9zt1r-ExtraLarge.jpg',
    fullRef : '116610LV',
    baseRef : '116610',
    link : 'https://google.com',
    hasBox: true,
    hasPapers: false
  },
]
 */ 
// Function to collect data

//Brand and Model values for app
//need to figure out hwo to import dynamicly from page
let inputs = {brandID : 1 , fullRef: "116610LV"}
var {brandID, fullRef} = inputs

function App() {
  // set state
  const [listings, setListings] = useState([])
  // call api to get current live listings
  const getListingData = async () => {
    const response = await fetch(
      `https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListings?brandID=${brandID}&fullRef=${fullRef}`
    ).then((response) => response.json())
    .catch(error => console.error(error))
      // add our data to state
    setListings(response)
    
    console.log("in function log: ", response)
    // return(response)
  }
  
  useEffect(() => {
    getListingData()
  }, [])
  
  
  // console.log("listings", listings)
  
  return (
    <Container centered>
        <ListingCardList listings={listings} />
    </Container>
  )
}

export default App

