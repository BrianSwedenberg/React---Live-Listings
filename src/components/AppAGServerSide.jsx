import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise'; // the AG Grid Enterprise Package
// import listingData from '/LiveListingCounts.json'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

// // Creates a client using Application Default Credentials
// import {Storage} = from '@google-cloud/storage';
// const storage = new Storage();

const getServerSideDatasource = (server) => {
  return {
    getRows: (params) => {
      // adding delay to simulate real server call
      setTimeout(function () {
        var response = server.getResponse(params.request);
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 500);
    },
  };
};


const getFakeServer = (allData) => {
  return {
    getResponse: (request) => {
      console.log(
        'asking for rows: ' + request.startRow + ' to ' + request.endRow
      );
      // take a slice of the total rows
      var rowsThisPage = allData.slice(request.startRow, request.endRow);
      // if row count is known, it's possible to skip over blocks
      var lastRow = allData.length;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
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
     {field: 'brandName_', filter: true, cellRenderer: 'agGroupCellRenderer', headerName: 'Brand Name'},
     {field: 'familyName_', filter: true, headerName: 'Family Name'},
     {field: 'baseRef_', filter: true, headerName: 'Base Ref Number'},
     {field: 'fullRef_', filter: true, headerName: 'Full Ref Number'},
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

  // Fetch data file from api endpoint
  const onGridReady = useCallback((params) => {
      console.log('on grid ready')
      fetch('https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsGridData')
       .then(result => result.json())
       .then((data) => {
        var server = getFakeServer(data);
        var datasource = getServerSideDatasource(server);
        params.api.setServerSideDatasource(datasource);
      });
    
  }, []);

   // useEffect(() => {
   //   fetch('https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsCountSimple')
   //   .then(result => result.json())
   //   .then(rowData => setRowData(rowData))
   // }, []);



  
  const onFirstDataRendered = useCallback((params) => {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        gridRef.current.api.getDisplayedRowAtIndex(0).setExpanded(true);
      }, 0);
  }, []);

  // const detailCellRendererParams = useMemo(() => {
  //     console.log('detail renderer')
  //     return {
  //       detailGridOptions: {
  //         columnDefs: [
  //           { field: 'platformName' },
  //           { field: 'brandName' },
  //           { field: 'familyName' },
  //           { field: 'fullRef' },
  //           { field: 'listPrice' },
  //           { field: 'link'}
            
            
  //         ],
  //         defaultColDef: {
  //           flex: 1,
  //         },
  //       },
  //       getDetailRowData: (params) => {
  //         console.log('detail callback')
  //         params.successCallback(params.data.listing_detail);
  //       },
  //     };
  // }, []);

  // console.log(rowData)
  

  const masterDetail = true

    
  const gridOptionsLevel3 = {
    // columnDefs: columnDefs,
    masterDetail: false,
    columnDefs: [
        { field: 'platformName', cellRenderer: 'agGroupCellRenderer' },
        { field: 'brandName' },
        { field: 'familyName' },
        { field: 'baseRef' },
        { field: 'fullRef' },
        { field: 'hasBox' },
        { field: 'hasPapers' },
        { field: 'listPrice' },
        { field: 'link' }
              
    ]
  }

  const gridOptionsLevel2 = {
    columnDefs: [
        { field: 'platformName_', cellRenderer: 'agGroupCellRenderer' },
        { field: 'brandName_' },
        { field: 'familyName_' },
        { field: 'fullRef_' },
        {field: 'listingID_nunique', filter: true, floatingFilter: false, headerName : 'Total Live Listings'},
     {field: 'listPrice_min', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Lowest Listed Price'},
     {field: 'listPrice_mean', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Average Listed Price'},
     {field: 'listPrice_max', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Highest Listed Price'}
              
    ],
    masterDetail: true,
    detailCellRendererParams:{
      detailGridOptions: gridOptionsLevel3,
      getDetailRowData: function (params) {
        // console.log('detail callback')
        params.successCallback(params.data.listing_detail);
      },
      // columnDefs: [
      //   { field: 'platformName' },
      //   { field: 'brandName' },
      //   { field: 'familyName' },
      //   { field: 'fullRef' }           
              
      // ],
      defaultColDef: {
        flex: 1,
      }
    }
  }
  
  const gridOptionsLevel1 = {
    columnDefs: columnDefs,
    masterDetail: true,
    onGridReady: onGridReady,
    onFirstDataRendered: onFirstDataRendered,
    detailCellRendererParams:{
      detailGridOptions: gridOptionsLevel2,
      getDetailRowData: function (params) {
        // console.log('detail callback')
        params.successCallback(params.data.platform_detail);
      },
      // columnDefs: [
      //   { field: 'platformName_', cellRenderer: 'agGroupCellRenderer' },
      //   { field: 'brandName_' },
      //   { field: 'familyName_' },
      //   { field: 'fullRef_' }           
              
      // ],
      defaultColDef: {
        flex: 1,
      }
    }
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