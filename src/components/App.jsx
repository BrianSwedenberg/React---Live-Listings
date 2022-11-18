import React, { useEffect, useState } from 'react'
import './App.css'
import {Container} from 'semantic-ui-react'
import ListingCardList from './ListingCardList'
import ListingTable from './ListingTable'


let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

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
    // return(response)
  }

  useEffect(() => {
    getListingData()
  }, [])

  // sort the listings by price from lowest to highest
  listings.sort((a, b) => a.listPrice - b.listPrice)

  const prices = listings.map(({listPrice}) => listPrice)
  const minPrice = dollarUS.format(Math.min(...prices))
  const maxPrice = dollarUS.format(Math.max(...prices))
  const listingCount = listings.length
  const platforms = listings.map(({platformID}) => platformID)
  const platformCount = new Set(platforms).size
  
  console.log("in function log: ", minPrice, listingCount, platformCount)
  
  return (
    <Container centered="true">
      <h3>There are currently {listingCount} Hulks listed for sale across {platformCount} sites that are being tracked.  The lowest price listed currently is {minPrice} and the highest price is {maxPrice}.</h3>
      <ListingCardList listings={listings} />
      {/*} <ListingTable listings={listings} />*/}
    </Container>
  )
}

export default App

