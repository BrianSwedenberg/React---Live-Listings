import React, { useState, useEffect } from 'react'
import Form from'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RefInputForm = (props) => {
  const [brandVal, setBrandVal] = useState();
  const [baseRef, setBaseRef] = useState();
  let isOn = props.isOn;
  
  const handleClick = (event) => {
    event.preventDefault();
    console.log('clicked but prevented default');
    console.log(event)
  }

  const handleBrandChange = (event) => {
    console.log('Form Brand Change');
    props.onBrandChange(event);
  }

  const handleBaseRefChange = (event) => {
    console.log('Form Base Ref Change');
    props.onBaseRefChange(event);
  }

  const handleMarketplaceChange = (event) => {
    props.onMarketplaceChange(event);
  }
  
  return (
    <div className='InputForm'>
      <Form className="form-box">
        <div className="brand-input w-25">
          <Form.Select value={brandVal} onChange={handleBrandChange}>
            <option>Brand</option>
            <option value="1">Rolex</option>
            <option value="2">Patek</option>
            <option value="3">AP</option>
            <option value="4">Lange</option>
            <option value="5">Omega</option>
            <option value="6">JLC</option>
            <option value="10">VC</option>
            <option value="16">Panerai</option>
            <option value="23">Breitling</option>
            <option value="25">Tag Heuer</option>
          </Form.Select>
        </div>
        {/*<Form.Label>Reference Number</Form.Label> */}
        <div className="ref-input w-75">
          <Form.Control 
            name="BaseRefValue" 
            placeholder="Reference Number" 
            onChange={handleBaseRefChange}
          />
        </div>
        <div className='marketplace-switch'>
          <Form.Check 
            type="switch" 
            id="marketplace-switch" 
            label="Remove EBAY and Chrono24"
            
            checked={isOn}
            onChange={handleMarketplaceChange}
          />
        </div>
        {/*} <Button variant="primary" type="submit" onClick={handleClick}>Submit</Button> */}
      </Form>  
    </div>
  )
}

export default RefInputForm