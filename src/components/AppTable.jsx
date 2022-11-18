import React, { useEffect, useState } from 'react'
import './App.css'
import {Container} from 'semantic-ui-react'
import ListingTable from './ListingTable.jsx'
import listingData from '/Listings.json'


let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

//Brand and Model values for app
//need to figure out hwo to import dynamicly from page
let inputs = {brandID : 1 , fullRef: "116610LV"}
var {brandID, fullRef} = inputs

function AppTable() {

const columns = [
    {
        name: 'FamilyName',
        selector: row => row.FamilyName,
    },
    {
        name: 'BrandName',
        selector: row => row.BrandName,
    },
    {
        name: 'BaseRef',
        selector: row => row.BaseRef,
    },
    {
        name: 'CurrentListings',
        selector: row => row.CurrentListings,
    },
    {
        name: 'LowestPrice',
        selector: row => row.LowestPrice,
    },
    {
        name: 'AveragePrice',
        selector: row => row.AvgPrice,
    },
    {
        name: 'HighestPrice',
        selector: row => row.HighestPrice,
    },
]


  
  return (
    <Container centered="true">
      <ListingTable columns={columns} data={listingData}/>
    </Container>
  )
}

export default AppTable

