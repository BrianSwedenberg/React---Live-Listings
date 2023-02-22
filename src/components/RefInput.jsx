import React, { useState, useEffect } from 'react'
import Form from'react-bootstrap/Form';

const RefInput = () => {

  return (
    <div>
      <Form>
        <Form.Label>Reference Number</Form.Label>
        <Form.Control name="BaseRefValue" placeholder="Reference Number"/>
      </Form>  
    </div>
  )
}

export default RefInput