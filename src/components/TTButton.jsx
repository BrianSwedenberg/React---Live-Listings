import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 95%;
  padding: 15px 45px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
  margin-left: 5px;
`



const TTButton = (props) => {
  const [data, setData] = useState();
  const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchRefDetail-Request';

  // let currentDate = new Date();
  // console.log(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())


  const handleClick = async () => {
    // console.log(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())
    // console.log(Date.now())
    let queryParams = {"brandID" : 1, "baseRef" : "116610", "num_of_days" : 0}
    try {
      fetch(apiURL, { method: 'POST', body: queryParams },)
        .then(response => response.json())
        .then(json => { console.log(json) });

      //   const response = await fetch(apiURL, {
      //                               method: 'GET',
      //                                // headers: {Accept: 'application/json',},
      // });

      // if (!response.ok) { throw new Error(response.statusText); }

      // console.log(response);
      // const result = await response.json();
      // console.log(result);
      // setData(result);
    }
    catch (err) {
      console.log('error = ', err)
    }

  }

  return (
    <div>
      <Button onClick={props.onClick}>{props.text}</Button>
    </div>
  )
}

export default TTButton