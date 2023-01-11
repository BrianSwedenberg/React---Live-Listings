import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 100%;
  padding: 15px 45px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
  margin-left: 5px;
`

const TTButton = (params) => {
  return (
    <div>
      <Button />
    </div>
  )
}

export default TTButton