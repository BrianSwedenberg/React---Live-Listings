import React from 'react'
import {ScatterChart, XAxis, YAxis, CartesianGrid, Scatter} from 'recharts'

let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

const PriceGraph = (props) => {
  // console.log("type date:", props.priceData)
  
  return (
    <ScatterChart width={1200} height={800} margin={{ top: 20, right: 20, bottom: 10, left: 10 }} >
      <CartesianGrid />
      <XAxis dataKey="ScrapeDate" name="Date"  angle="45" />
      <YAxis dataKey="ListPrice" domain={['auto', 'auto']} name="Price" />
      <Scatter name="price data" data={props.priceData} />
    </ScatterChart>
  )
}

export default PriceGraph