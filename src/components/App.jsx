import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import {Container} from 'semantic-ui-react'
// import ListingItem from './ListingItem'
// import ListingCard from './ListingCard'
// import ListingItemList from './ListingItemList'
import ListingCardList from './ListingCardList'
// import ListingCard from './ListingCard'



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
  
// Function to collect data

const getListingData = async () => {
  const response = await fetch(
    "https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListings?brandID=1&fullRef=116610LV"
  ).then((response) => response.json())
  // console.log(response)
  // return(response)
}


function App() {
  // getApiData()
  // const [listings1, setListings] = useState([])
  // setListings(getListingData())
  // const listings = getListingData()
  return (
    <Container centered>

        <ListingCardList listings={listings} />

    </Container>
  )
}

export default App


//      <ListingItem brand='Rolex' family='Submariner' platform='EBAY' listPrice='$24,500'/>
