import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function RefListItem(props) {
  const handleRefClick = () => {
    alert(props.children)
  }

  if (props.isTitle && props.listLength == 0){
    return (
      <div></div>
    );
  }
  
  else if (props.isTitle && props.listLength > 0){
    return (
      <ListGroup.Item action onClick={props.onClick}>
        {props.children}  
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup.Item action onClick={props.onClick}>
      {props.children}  
    </ListGroup.Item>
  );
}

export default RefListItem;