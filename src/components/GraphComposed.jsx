import React from 'react'
import {ComposedChart, XAxis, YAxis, CartesianGrid, Scatter, Area, Line, Tooltip} from 'recharts'
import regression from 'regression'



const PriceGraphComposed = (props) => {
  // console.log(props.priceData)

  const result = regression.linear( props.regData )
  let slope = result.equation[0]
  let intercept = result.equation[1]
  let lastIndex = (props.priceData.length-1)
  let firstLastIndex = [0, (props.priceData.length-1)]
  
  console.log(props.priceData[0])

  // const priceDataReg = props.priceData.map(addRegLine)
  addRegLine(props.priceData[0])
  addRegLine(props.priceData[lastIndex])
  // console.log(props.priceData[props.priceData.length-1])
  
  function addRegLine(priceData){
    priceData.ScrapeDateDate = new Date(priceData.ScrapeDate)
    priceData['DayLag'] = ((priceData.ScrapeDateDate - props.minDate) / (24*3600*1000))
    priceData['RegLinePrice'] = (priceData.DayLag * slope) + intercept
  }
  
  return (
    <ComposedChart data={props.priceData} width={1200} height={600} margin={{ top: 20, right: 20, bottom: 10, left: 10 }} >
      <CartesianGrid stroke="#f5f5f5"/>
      <XAxis dataKey="ScrapeDate" name="Date"  angle="45" />
      <YAxis domain={['auto', 'auto']} name="Price" />
      <Scatter dataKey="ListPrice" name="price data"  />
      <Line dataKey="RegLinePrice" stroke="#116b33" strokeWidth={6} type="natural" connectNulls="true" dot={false}/>
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    </ComposedChart>
  )
}

export default PriceGraphComposed