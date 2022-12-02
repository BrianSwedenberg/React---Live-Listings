import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise'; // the AG Grid Enterprise Package
// import listingData from '/LiveListingCounts.json'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const createServerSideDatasource = (server) => {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          console.log(response.rows)
          params.success({ rowData: response.rows });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
};

const createFakeServer = () => {
  return {
    getData: (request) => {
      let requestedRows = undefined;
      // take a copy of the data to return to the client
      const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsGridDataRows?' + new URLSearchParams({"start_row": 0, "row_count": 1000}).toString();
      console.log('datasource - ', apiURL)
      fetch(apiURL)
       .then(response => response.json())
       .then(response => {
          // params.successCallback(response);
         console.log("this is the response from create fake server");
          console.log(response);
          requestedRows = response;
       })
       // .then(params.success({ rowData: requestedRows }))
       .catch(error => {
         console.error(error);
         // params.failCallback();
       })
      return {
        success: true,
        rows: requestedRows,
      };
    },
  };
};


const AppAGServerSide = () => {

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
     {field: 'brandName', filter: true, cellRenderer: 'agGroupCellRenderer', headerName: 'Brand Name'},
     {field: 'familyName', filter: true, headerName: 'Family Name'},
     {field: 'baseRef', filter: true, headerName: 'Base Ref Number'},
     {field: 'fullRef', filter: true, headerName: 'Full Ref Number'}
     
   ]);

   // DefaultColDef sets props common to all Columns
   const defaultColDef = useMemo( ()=> ({
      sortable: true,
      floatingFilter: true
   }));

  // Fetch data file from api endpoint
  const onGridReady = useCallback((params) => {
    const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsGridDataRows?' + new URLSearchParams({"start_row": 0, "row_count": 1000}).toString();
    fetch(apiURL)
       .then(response => response.json())
      .then(response => {console.log(response)})
      var fakeServer = createFakeServer();
      var datasource = createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    
  }, []);



  
  const onFirstDataRendered = useCallback((params) => {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        gridRef.current.api.getDisplayedRowAtIndex(0).setExpanded(true);
      }, 0);
  }, []);

 
  const gridOptionsLevel1 = {
    columnDefs: columnDefs,
    masterDetail: true,
    onGridReady: onGridReady,
    onFirstDataRendered: onFirstDataRendered,
      defaultColDef: {
        flex: 1,
      }
    // setServerSideDatasource: datasource
  }
  








 return (
   <div>

     {/* Example using Grid's API */}
     {/*<button onClick={buttonListener}>Push Me</button>*/}

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{width: 2400, height: 800}}>
     {/*<div className="ag-theme-alpine" style={{width: 1250, height: 800}}>*/}

       <AgGridReact
           gridOptions={gridOptionsLevel1}
           
           ref={gridRef} // Ref for accessing Grid's API
           rowData={rowData} // Row Data for Rows
           // columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties
           rowModelType={'serverSide'}
           // serverSideInfiniteScroll={true}

           // masterDetail={masterDetail}
           // animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           // rowSelection='multiple' // Options - allows click selection of rows
           // onGridReady={onGridReady}
           // onFirstDataRendered={onFirstDataRendered}
           // detailCellRendererParams={detailCellRendererParams}

           // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
   </div>
 );
};

export default AppAGServerSide;