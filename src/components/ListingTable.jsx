import React from 'react'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { AGGridReact } from 'ag-grid-react'


let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
	</>
)

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`



const ListingTable = (props) => {
 //  console.log(props)
  // const [filterText, setFilterText] = React.useState('')
	// const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	// const filteredItems = fakeUsers.filter(
	// 	item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	// )

  
  
  return(
    <DataTable 
      title = 'Watch Listings'
      columns={props.columns} 
      data={props.data} 
      pagination
      persistTableHead
      subHeader
    />  
 ) 
}

export default ListingTable
