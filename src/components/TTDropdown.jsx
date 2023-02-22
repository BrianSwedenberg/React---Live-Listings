import React, { useState, useEffect } from 'react'
import Dropdown from'react-bootstrap/Dropdown';

const TTDropdown = (props) => {
  
  return (
    <div>
      <Dropdown >
        <Dropdown.Toggle split varian="success" id="dropdown-basic">
          Brand
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item >Rolex</Dropdown.Item>
          <Dropdown.Item >Patek Phillipe</Dropdown.Item>
          <Dropdown.Item >Audemars Piguet</Dropdown.Item>
          <Dropdown.Item >A. Lange und Sohne</Dropdown.Item>
          <Dropdown.Item >Omega</Dropdown.Item>
          <Dropdown.Item >Jaeger LeCoultre</Dropdown.Item>
          <Dropdown.Item >Vacheron Constatin</Dropdown.Item>
          <Dropdown.Item >Panerai</Dropdown.Item>
          <Dropdown.Item >Audemars Piguet</Dropdown.Item>
          <Dropdown.Item >Breitling</Dropdown.Item>
          <Dropdown.Item >Tag Heuer</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default TTDropdown