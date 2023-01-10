import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
// import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise'; // the AG Grid Enterprise Package
import logoType from '../images/Logotype1.png';
import styled from 'styled-components';
import BrandList from "/src/Data/BrandList.json";
import LinkCellRenderer from './linkCellRenderer.jsx'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const Button = styled.button`
  background-color: #00A9E8;
  color: white;
  width: 100%;
  padding: 15px 45px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
  margin-left: 5px;
`
const logoutButtonPress = () => {
  // alert("button click");
  netlifyIdentity.logout();
}

const datasource = {
  rowCount: undefined,
  getRows(params) {
    console.log('datasource get rows params - ', params)
    console.log('params sort model - ', params.request.sortModel)
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
        // params.successCallback(response.rows);
        params.success({
          rowData: response.rows,
          endRow: response.lastRow,
          rowCount: response.rowCount
        })
        console.log(response);
      })
      .catch(error => {
        console.error(error);
        params.failCallback();
      })

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
      sortable: true,
      cellRenderer: 'agGroupCellRenderer',
      headerName: 'Brand Name'
    },
    { field: 'familyName', filter: true, sortable: true, headerName: 'Family Name', resizable: true },
    { field: 'baseRef', filter: 'agTextColumnFilter', sortable: true, headerName: 'Base Ref Number', resizable: true },
    { field: 'fullRef', filter: 'agTextColumnFilter', sortable: true, headerName: 'Full Ref Number', resizable: true },
    // {field: 'CurrentListings', filter: true, floatingFilter: false},
    { field: 'platformName', headerName: 'Platform Name', resizable: true },
    { field: 'hasBox', headerName: 'Has Original Box', resizable: true },
    { field: 'hasPapers', headerName: 'Has Papers', resizable: true },


    { field: 'listPrice', sortable: true, valueFormatter: currencyFormatter, headerName: 'List Price', resizable: true },
    { field: 'link', headerName: 'Listing Link', cellRenderer: LinkCellRenderer, resizable: true }
  ]);

  const [style, setStyle] = useState({
    height: '100%',
    width: '100%',
  });

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
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
    gridRef.current.api.sizeColumnsToFit({
      defaultMinWidth: 100
    });
  }, []);


  const onFirstDataRendered = useCallback((params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function() {
      gridRef.current.api.getDisplayedRowAtIndex(0).setExpanded(false);
    }, 0);
  }, []);

  const gridOptionsLevel1 = {
    columnDefs: columnDefs,
    masterDetail: false,
    onGridReady: onGridReady,
    onFirstDataRendered: onFirstDataRendered,
    ServerSideDatasource: datasource

  }








  return (
    <div>
      <img src={logoType} />
      <div className="ButtonContainer">
        <Button onClick={logoutButtonPress}>
          Log Out
        </Button>
      </div>
      <div style={style}>

        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{ height: 1600 }}>
          {/*<div className="ag-theme-alpine" style={{width: 1250, height: 800}}>*/}

          <AgGridReact
            gridOptions={gridOptionsLevel1}

            ref={gridRef} // Ref for accessing Grid's API
            defaultColDef={defaultColDef} // Default Column Properties
            rowModelType={'serverSide'}
            serverSideInfiniteScroll={true}
            cacheBlockSize={200}
            maxBlocksInCache={2}

          />
        </div>
      </div>
    </div>
  );
};

export default AppAGServerSide;