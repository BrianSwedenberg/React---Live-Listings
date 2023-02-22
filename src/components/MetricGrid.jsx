import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Table from 'react-bootstrap/Table';
import listingData from '../Data/SampleListingData.json';
import { min, max, sum, mean, median, standardDeviation } from 'simple-statistics';

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function MetricGrid(props) {
  
  function filterListings(listings_obj, fullRef, excludeMarketplace) {
    const marketplaces = ['EBAY', 'Chrono24'];
    let filtered_listings_obj = Object.assign({}, listings_obj)
    // console.log('listing_obj', listings_obj)
    // console.log('filter object length', filtered_listings_obj['Current'].length)
    // console.log('fullRef in filter - ', fullRef)

    if ((!fullRef || fullRef == '') && (!excludeMarketplace || excludeMarketplace == false)) {
      return filtered_listings_obj
    }
    else if ((!fullRef || fullRef == '') && excludeMarketplace) {
      filtered_listings_obj['Current'] = listings_obj.Current.filter(listing => ((!marketplaces.includes(listing.PlatformName)))).map(listing => listing)
      // console.log('filter object length post filter', filtered_listings_obj['Current'].length)
      filtered_listings_obj['Last30'] = listings_obj.Last30.filter(listing => ((!marketplaces.includes(listing.PlatformName)))).map(listing => listing)
      return filtered_listings_obj
    }
      
    else if ((fullRef != '') && !excludeMarketplace) {
      console.log('reached correct switch');
      filtered_listings_obj['Current'] = listings_obj.Current.filter(listing => listing.FullRef == fullRef).map(listing => listing)
      // console.log('filter object length post filter', filtered_listings_obj['Current'].length)
      filtered_listings_obj['Last30'] = listings_obj.Last30.filter(listing => listing.FullRef == fullRef).map(listing => listing)
      return filtered_listings_obj
    }
      
    else {
      filtered_listings_obj['Current'] = listings_obj.Current.filter(listing => ((listing.FullRef == fullRef) && (!marketplaces.includes(listing.PlatformName)))).map(listing => listing)
      // console.log('filter object length post filter', filtered_listings_obj['Current'].length)
      filtered_listings_obj['Last30'] = listings_obj.Last30.filter(listing => ((listing.FullRef == fullRef) && (!marketplaces.includes(listing.PlatformName)))).map(listing => listing)
      return filtered_listings_obj
    }
    
  }
  
  function removeOutliersFromPrices(price_array){
    if (price_array.length > 0) {
      let avgPrice = mean(price_array)
      let priceStd = standardDeviation(price_array)
      let outlierCutoff_min = avgPrice - (priceStd * 1.5)
      let outlierCutoff_max = avgPrice + (priceStd * 1.5)
      // console.log(avgPrice, priceStd, outlierCutoff_min, outlierCutoff_max)
      let new_array = price_array.filter(number => (number >= outlierCutoff_min && number <= outlierCutoff_max)).map(number => number)
      return new_array
    }
    else { return price_array }
  }

  function formatPriceArrays(listingData){
    const currentListingsArr = listingData['Current']
    let prices_current = currentListingsArr.map(listing => listing.ListPrice)
    let prices_current_clean = removeOutliersFromPrices(prices_current)

    const last30ListingsArr = listingData['Last30']
    let prices_last_30 = last30ListingsArr.map(listing => listing.ListPrice)
    let prices_last_30_clean = removeOutliersFromPrices(prices_last_30)

    const clean_prices = {
      "Current" : prices_current_clean,
      "Last30" : prices_last_30_clean
    }
    return clean_prices
  }

  function createMetricArray(listing_array) {
    let metric_arr = {
      "current_avg" : 0,
      "current_min" : 0,
      "current_max" : 0,
      "current_count" : 0,
      "last_30_avg" : 0,
      "last_30_min" : 0,
      "last_30_max" : 0,
      "last_30_count" : 0,
      "pct_change_avg_30": 0,
      "pct_change_min_30": 0,
      "pct_change_max_30": 0
    }

    if (listing_array.Current.length > 0) {
      metric_arr.current_avg = mean(listing_array['Current'])
      metric_arr.current_min = min(clean_price_arr['Current'])
      metric_arr.current_max = max(clean_price_arr['Current'])
      metric_arr.current_count = clean_price_arr['Current'].length
    }
    if (listing_array.Last30.length > 0) {
      metric_arr.last_30_avg = mean(listing_array['Last30'])
      metric_arr.last_30_min = min(clean_price_arr['Last30'])
      metric_arr.last_30_max = max(clean_price_arr['Last30'])
      metric_arr.last_30_count = clean_price_arr['Last30'].length
    }
    if (listing_array.Current.length > 0 && listing_array.Last30.length > 0){
      metric_arr.pct_change_avg_30 = (Math.round(10000 * ((metric_arr.current_avg / metric_arr.last_30_avg)-1)) / 100)
      metric_arr.pct_change_min_30 = (Math.round(10000 * ((metric_arr.current_min / metric_arr.last_30_min)-1)) / 100)
      metric_arr.pct_change_max_30 = (Math.round(10000 * ((metric_arr.current_max / metric_arr.last_30_max)-1)) / 100)
    }
    return metric_arr
  }

  // console.log('metrics props listings ', props.listings)
  let clean_price_arr = {}
  if ( !props.listings || props.listings.Empty == true ) {
    clean_price_arr = {"Current": [], "Last30": [] } ;
  }
  else {
    // console.log('pre-filter', props.listings)
    
    clean_price_arr = formatPriceArrays(filterListings(props.listings, props.fullRef, props.excludeMarketplace))
    // console.log('clean array - ', clean_price_arr)
  }

  const metrics_arr = createMetricArray(clean_price_arr)
  
  
  
  // let metric_arr = {
  //   "current_avg" : mean(clean_price_arr['Current']),
  //   "last_30_avg" : mean(clean_price_arr['Last30']),

  //   "current_min" : min(clean_price_arr['Current']),
  //   "last_30_min" : min(clean_price_arr['Last30']),

  //   "current_max" : max(clean_price_arr['Current']),
  //   "last_30_max" : max(clean_price_arr['Last30'])
  // }
  
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th></th>
          <th>Current</th>
          <th>Last 30 Days (Daily Avg)</th>
          <th>% Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Avg Listed Price</td>
          <td>{USDollar.format(metrics_arr.current_avg)}</td>
          <td>{USDollar.format(metrics_arr.last_30_avg)}</td>
          <td>{metrics_arr.pct_change_avg_30}%</td>
        </tr>
        <tr>
          <td>Min Listed Price</td>
          <td>{USDollar.format(metrics_arr.current_min)}</td>
          <td>{USDollar.format(metrics_arr.last_30_min)}</td>
          <td>{metrics_arr.pct_change_min_30}%</td>
        </tr>
        <tr>
          <td>Max Listed Price</td>
          <td>{USDollar.format(metrics_arr.current_max)}</td>
          <td>{USDollar.format(metrics_arr.last_30_max)}</td>
          <td>{metrics_arr.pct_change_max_30}%</td>
        </tr>
        <tr>
          <td>Total Listings</td>
          <td>{clean_price_arr['Current'].length}</td>
          <td>{Math.round(clean_price_arr['Last30'].length / 30)}</td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  )
}

export default MetricGrid