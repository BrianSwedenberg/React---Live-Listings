import React from 'react'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { AGGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'

let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});




const ListingTableAG = (props) => {
  
   
  return(
    <AgGridReact
           // ref={gridRef} // Ref for accessing Grid's API

           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
 ) 
}

export default ListingTableAG
