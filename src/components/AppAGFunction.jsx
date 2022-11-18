import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise'; // the AG Grid Enterprise Package
// import listingData from '/LiveListingCounts.json'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

function AppAGFunction() {

 const gridRef = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  const currencyFormatter = (params) => {
  return '$' + formatNumber(params.value);
  };

  const formatNumber = (number) => {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  
   // Each Column Definition results in one Column.
   const [columnDefs, setColumnDefs] = useState([
     {field: 'brandName_', filter: true, cellRenderer: 'agGroupCellRenderer'},
     {field: 'familyName_', filter: true},
     {field: 'baseRef_', filter: true},
     {field: 'fullRef_', filter: true},
     // {field: 'CurrentListings', filter: true, floatingFilter: false},
     {field: 'listingID_nunique', filter: true, floatingFilter: false, headerName : 'Total Live Listings'},
     {field: 'listPrice_min', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Lowest Listed Price'},
     {field: 'listPrice_mean', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Average Listed Price'},
     {field: 'listPrice_max', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Highest Listed Price'}
     // {field: 'AvgPrice', filter: true, floatingFilter: false, valueFormatter: currencyFormatter},
     // {field: 'HighestPrice', filter: true, floatingFilter: false, valueFormatter: currencyFormatter}
   ]);

   // DefaultColDef sets props common to all Columns
   const defaultColDef = useMemo( ()=> ({
      sortable: true,
      floatingFilter: true
   }));

   // Example of consuming Grid Event
   const cellClickedListener = useCallback( event => {
     console.log('cellClicked', event);
  }, []);

  // Fetch data file from api endpoint
  const onGridReady = useCallback((params) => {
      fetch('https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsGridData')
       .then(result => result.json())
       .then(rowData => { setRowData(rowData);
     });
  }, []);

  const onFirstDataRendered = useCallback((params) => {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        gridRef.current.api.getDisplayedRowAtIndex(0).setExpanded(true);
      }, 0);
  }, []);

  const detailCellRendererParams = useMemo(() => {
      return {
        detailGridOptions: {
          columnDefs: [
            { field: 'platformName' },
            { field: 'brandName' },
            { field: 'familyName' },
            { field: 'fullRef' },
            { field: 'listPrice' },
            { field: 'link'}
            
            
          ],
          defaultColDef: {
            flex: 1,
          },
        },
        getDetailRowData: (params) => {
          params.successCallback(params.data.listing_detail);
        },
      };
  }, []);

  // console.log(rowData)
  

  const masterDetail = true
  
// const gridOptions = {
//   columnDefs: columnDefs,
//   masterDetail: true,
//   onFirstDataRendered: onFirstDataRendered
// }
  

 // // Example using Grid's API
 // const buttonListener = useCallback( e => {
 //   gridRef.current.api.deselectAll();
 // }, []);

 return (
   <div>

     {/* Example using Grid's API */}
     {/*<button onClick={buttonListener}>Push Me</button>*/}

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{width: 1600, height: 800}}>
     {/*<div className="ag-theme-alpine" style={{width: 1250, height: 800}}>*/}

       <AgGridReact
           // gridOptions={gridOptions}
           
           ref={gridRef} // Ref for accessing Grid's API
           rowData={rowData} // Row Data for Rows
           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           masterDetail={masterDetail}
           // animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           // rowSelection='multiple' // Options - allows click selection of rows
           onGridReady={onGridReady}
           onFirstDataRendered={onFirstDataRendered}
           detailCellRendererParams={detailCellRendererParams}

           // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
   </div>
 );
};

export default AppAGFunction;