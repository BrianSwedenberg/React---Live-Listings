import React from 'react'
import ListingItem from './ListingItem'

const ListingItemList = (props) =>{
  console.log(props)

  const renderListingItemList = props.listings.map((listing) => {
    return (
      <ListingItem listing={listing}></ListingItem>
    )
  })
  
  return <div className='Item.Group'>{renderListingItemList}</div>
  
}

export default ListingItemList