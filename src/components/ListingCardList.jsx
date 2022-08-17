import React from 'react'
import ListingCard from './ListingCard'
import {Card} from 'semantic-ui-react'

const ListingCardList = (props) =>{
  console.log(props)

  const renderListingCardList = props.listings.map((listing) => {
    return (
      <ListingCard listing={listing}></ListingCard>
    )
  })
  
  return <Card.Group centered column-count={3}>{renderListingCardList}</Card.Group>
  
}

export default ListingCardList