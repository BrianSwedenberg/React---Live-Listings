import React, { useEffect, useState } from 'react'
import './App.css'
import {Container} from 'semantic-ui-react'
import PriceGraph from './Graph.jsx'
import PriceGraphComposed from './GraphComposed.jsx'


let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

//Brand and Model values for app
//need to figure out hwo to import dynamicly from page
let inputs = {brandID : 1 , fullRef: "116610LV"}
var {brandID, fullRef} = inputs

function AppGraph() {
  // set state
  const [listings, setListings] = useState([])
  // call api to get current live listings
  const getListingData = async () => {
    const response = await fetch(
      `https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchAllListingsSimple`
    ).then((response) => response.json())
    .catch(error => console.error(error))
      // add our data to state
    setListings(response)
    // return(response)
  }

  useEffect(() => {
    getListingData()
  }, [])

  const prices = listings.map(({ListPrice}) => ListPrice)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  // console.log("min max", minPrice, maxPrice)

  const dates = listings.map(({ScrapeDate}) => new Date(ScrapeDate))
  const minDate = new Date(Math.min(...dates))
  const maxDate = new Date(Math.max(...dates))
  // console.log("min max date", minDate, maxDate, (maxDate - minDate) / (24*3600*1000))

  const regData = listings.map( Object.values )
  
  regData.map(arrStrToDate)
  // console.log(regData[0])

  function arrStrToDate(item){
    let useDate = new Date(item[0])
    item[0] = (useDate - minDate) / (24*3600*1000)
  }
  
  return (
    <Container centered="true">
      {/*<PriceGraph priceData={listings} /> */}
      <PriceGraphComposed priceData={listings} regData={regData} minDate={minDate}/>
    </Container>
  )
}

export default AppGraph

