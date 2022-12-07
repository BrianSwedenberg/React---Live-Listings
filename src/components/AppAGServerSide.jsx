import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise'; // the AG Grid Enterprise Package
import BrandList from "/src/Data/BrandList.json";
import LinkCellRenderer from './linkCellRenderer.jsx'


import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


const datasource = {
    rowCount: undefined,
    getRows(params) {
      // console.log(JSON.stringify(params.request, null, 1));
      console.log('datasource get rows params - ', params)
      console.log('params sort model - ', params.request.sortModel)
      let start_row = params.request.startRow
      let row_count = params.request.endRow - params.request.startRow
      // const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsGridDataRows?' + new URLSearchParams({"start_row": start_row, "row_count": row_count}).toString();
      const apiURL = 'https://us-east4-centered-arbor-354419.cloudfunctions.net/fetchLiveListingsGridDataRows-Request';
      console.log('datasource - ', apiURL)
      console.log(params.request)
      fetch(apiURL, {
          method: 'POST',
          // mode: 'cors',
          body: JSON.stringify(params.request)
        }
      )
         .then(response => response.json())
         .then(response => {
            params.successCallback(response);
            console.log(response);
         })
         .catch(error => {
             console.error(error);
             params.failCallback();
         })       
      // setTimeout(function () {
      //   if (response.success) {
      //     // supply rows for requested block to grid
      //     console.log(response.rows)
      //     params.successCallback(response);
          
      //   } else {
      //     params.fail();
      //   }
      // }, 500);
      
    }
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
     {
       field: 'brandName', 
       type: 'text', 
       filter: 'agSetColumnFilter',
       filterParams: {
         values: BrandList
       },
       sortable:true,  
       cellRenderer: 'agGroupCellRenderer', 
       headerName: 'Brand Name'
     },
     {field: 'familyName', filter: true, sortable:true, headerName: 'Family Name'},
     {field: 'baseRef', filter: true, sortable:true, headerName: 'Base Ref Number'},
     {field: 'fullRef', filter: true, sortable:true, headerName: 'Full Ref Number'},
     // {field: 'CurrentListings', filter: true, floatingFilter: false},
     {field: 'platformName', headerName: 'Platform Name'},
     {field: 'hasBox', headerName: 'Has Original Box'},
     {field: 'hasPapers', headerName: 'Has Papers'},
     
     
     {field: 'listPrice', sortable:true, valueFormatter: currencyFormatter, headerName : 'List Price'},
     {field: 'link', headerName: 'Listing Link', cellRenderer: LinkCellRenderer}
   ]);

   // DefaultColDef sets props common to all Columns
   const defaultColDef = useMemo( ()=> ({
      sortable: true,
      floatingFilter: true
   }));
  const columnTypes = useMemo(() => {
    return {
      text: { filter: 'agTextColumnFilter' },
    };
  }, []);

  // Fetch data file from api endpoint
  const onGridReady = useCallback((params) => {
      console.log('on grid ready')     
      params.api.setServerSideDatasource(datasource);
  }, []);


  
  const onFirstDataRendered = useCallback((params) => {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        gridRef.current.api.getDisplayedRowAtIndex(0).setExpanded(false);
      }, 0);
  }, []);



  // const gridOptionsLevel2 = {
  //   columnDefs: [
  //       { field: 'platformName_', cellRenderer: 'agGroupCellRenderer' },
  //       { field: 'brandName_' },
  //       { field: 'familyName_' },
  //       { field: 'fullRef_' },
  //       {field: 'listingID_nunique', filter: true, floatingFilter: false, headerName : 'Total Live Listings'},
  //    {field: 'listPrice_min', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Lowest Listed Price'},
  //    {field: 'listPrice_mean', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Average Listed Price'},
  //    {field: 'listPrice_max', filter: true, floatingFilter: false, valueFormatter: currencyFormatter, headerName : 'Highest Listed Price'}
              
  //   ],
  //   masterDetail: true,
  //   detailCellRendererParams:{
  //     detailGridOptions: gridOptionsLevel3,
  //     getDetailRowData: function (params) {
  //       // console.log('detail callback')
  //       params.successCallback(params.data.listing_detail);
  //     },
  //     // columnDefs: [
  //     //   { field: 'platformName' },
  //     //   { field: 'brandName' },
  //     //   { field: 'familyName' },
  //     //   { field: 'fullRef' }           
              
  //     // ],
  //     defaultColDef: {
  //       flex: 1,
  //     }
  //   }
  // }
  
  const gridOptionsLevel1 = {
    columnDefs: columnDefs,
    masterDetail: false,
    onGridReady: onGridReady,
    onFirstDataRendered: onFirstDataRendered,
    ServerSideDatasource: datasource
    // detailCellRendererParams:{
    //   detailGridOptions: gridOptionsLevel2,
    //   getDetailRowData: function (params) {
    //     // console.log('detail callback')
    //     params.successCallback(params.data.platform_detail);
    //   },
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
     <div className="ag-theme-alpine" style={{width: 2400, height: 800}}>
     {/*<div className="ag-theme-alpine" style={{width: 1250, height: 800}}>*/}

       <AgGridReact
           gridOptions={gridOptionsLevel1}
           
           ref={gridRef} // Ref for accessing Grid's API
           // rowData={rowData} // Row Data for Rows  DONT NEED THIS FOR SERVER-SIDE MODEL
           // columnTypes={columnTypes}
           
           // columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties
           rowModelType={'serverSide'}
           serverSideInfiniteScroll={true}
           cacheBlockSize={200}

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