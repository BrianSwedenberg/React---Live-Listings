import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise'; // the AG Grid Enterprise Package
// import listingData from '/LiveListingCounts.json'
import listingData from '/GridData_Simple.json'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

// import { BigQuery } from '@google-cloud/bigquery'
// const BQ = new BigQuery()

// // Creates a client using Application Default Credentials
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();


const AppAGGroup = () => {

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
    { field: 'brandName', filter: true, cellRenderer: 'agGroupCellRenderer', headerName: 'Brand Name', rowGroup: true, hide: true },
    { field: 'familyName', filter: true, headerName: 'Family Name', rowGroup: true, hide: true },
    { field: 'baseRef', filter: true, headerName: 'Base Ref Number', rowGroup: true, hide: true },
    { field: 'fullRef', filter: true, headerName: 'Full Ref Number', rowGroup: true, hide: true },
    { field: 'platformName', filter: true, headerName: 'Platform Name', rowGroup: true, hide: true },
    { field: 'hasBox', filter: true, headerName: 'Has Box', hide: true},
    { field: 'hasPapers', filter: true, headerName: 'Has Papers', hide: true},
    { field: 'watchCondition', filter: true, headerName: 'Watch Condition', hide: true},
    { field: 'watchYear', filter: true, headerName: 'Watch Year', hide: true},
    // { field: 'link', headerName: 'Listing Link', 
    //    cellRenderer:(params) => {
    //      var linkData = params.value;
    //      var newLink = '<a href="www.google.com">Listing Link</a>'
    //      return newLink
    //    }
    // },
    // {field: 'CurrentListings', filter: true, floatingFilter: false},

    { field: 'listPrice', filter: true, floatingFilter: false, aggFunc: 'count', headerName: 'Total Live Listings' },
    { field: 'listPrice', filter: true, floatingFilter: false, aggFunc: 'min', valueFormatter: currencyFormatter, headerName: 'Lowest Listed Price' },
    { field: 'listPrice', filter: true, floatingFilter: false, aggFunc: 'median', valueFormatter: currencyFormatter, headerName: 'Median Listed Price' },
    // {field: 'listPrice', filter: true, floatingFilter: false, aggFunc: 'avg', valueFormatter: currencyFormatter, headerName : 'List Price Avg'},
    { field: 'listPrice', filter: true, floatingFilter: false, aggFunc: 'max', valueFormatter: currencyFormatter, headerName: 'Highest Listed Price' }
    // {field: 'listPrice_mean', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Average Listed Price'},
    // {field: 'listPrice_max', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Highest Listed Price'}
    // {field: 'AvgPrice', filter: true, floatingFilter: false, valueFormatter: currencyFormatter},
    // {field: 'HighestPrice', filter: true, floatingFilter: false, valueFormatter: currencyFormatter}
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    floatingFilter: true
  }));

  const aggFuncs = {
    'median': params => {
      const mid = Math.floor(params.values.length / 2),
        nums = [...params.values].sort((a, b) => a - b);
      return params.values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }
  }

  // Fetch data file from api endpoint
  const onGridReady = useCallback((params) => {
    console.log('on grid ready')
    // fetch('GridData_Simple.json')
    // fetch('https://storage.cloud.google.com/times-table-bucket1/LiveListingGridData/GridData_PlatformDetail.json?authuser=1')
    setRowData(listingData)

  }, []);

  // useEffect(() => {
  //   fetch('https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsCountSimple')
  //   .then(result => result.json())
  //   .then(rowData => setRowData(rowData))
  // }, []);




  const onFirstDataRendered = useCallback((params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function() {
      gridRef.current.api.getDisplayedRowAtIndex(0).setExpanded(true);
    }, 0);
  }, []);





  const autoGroupColumnDef = {
    // enables filtering on the group column
    filter: true,
    // supplies 'country' values to the filter 
    filterValueGetter: params => {
      const colId = params.column.colId;
      if (colId.includes('brand')) {
        return params.data.brandName;
      }
      if (colId.includes('family')) {
        return params.data.familyName;
      }
      if (colId.includes('baseRef')) {
        return params.data.baseRef;
      }
      if (colId.includes('fullRef')) {
        return params.data.fullRef;
      }
    }
  };

  const gridOptionsLevel1 = {
    columnDefs: columnDefs,
    masterDetail: false,
    onGridReady: onGridReady,
    onFirstDataRendered: onFirstDataRendered,
    groupDisplayType: 'multipleColumns',
    autoGroupColumnDef: autoGroupColumnDef,
    aggFuncs: aggFuncs,
    suppressAggFuncInHeader: true
    // detailCellRendererParams:{
    // detailGridOptions: gridOptionsLevel2,
    // getDetailRowData: function (params) {
    // console.log('detail callback')
    // params.successCallback(params.data.platform_detail);
    // },
    // columnDefs: [
    //   { field: 'platformName_', cellRenderer: 'agGroupCellRenderer' },
    //   { field: 'brandName_' },
    //   { field: 'familyName_' },
    //   { field: 'fullRef_' }           

    // ],
    // defaultColDef: {
    //   flex: 1,
    // }
    // }
  }








  return (
    <div>

      {/* Example using Grid's API */}
      {/*<button onClick={buttonListener}>Push Me</button>*/}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 2400, height: 1200 }}>
        {/*<div className="ag-theme-alpine" style={{width: 1250, height: 800}}>*/}

        <AgGridReact
          gridOptions={gridOptionsLevel1}

          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          // columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          sideBar={true}
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

export default AppAGGroup;