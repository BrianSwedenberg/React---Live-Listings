import React from 'react'
import ListingCard from './ListingCard'
import {Segment, Divider, Card} from 'semantic-ui-react'

let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

const ListingCardList = (props) =>{
  // console.log(props)

  // const listPriceFormatted = dollarUS.format(listPrice)
  
  const prices = props.listings.map(({listPrice}) => listPrice)
  const minPrice = dollarUS.format(Math.min(...prices))
  const maxPrice = dollarUS.format(Math.max(...prices))
  const listingCount = props.listings.length
  const platforms = props.listings.map(({platformID}) => platformID)
  const platformCount = new Set(platforms).size
  
  const renderListingCardList = props.listings.map((listing) => {
    return (
      <ListingCard listing={listing}></ListingCard>
    )
  })
  
  // return <Card.Group centered column-count={6}>{renderListingCardList}</Card.Group>
  return (
    // <div name='CardSegment' class='ui raised very padded segment'>
    <Segment raised padded scrollable="true">
      <h2>Hulks Currently Listed for Sale:</h2>
      <Divider />
      {/*<div class='ui five cards'>{renderListingCardList}</div>*/}
      <Card.Group stackable itemsPerRow={5}>{renderListingCardList}</Card.Group>
    </Segment>
  )
}

export default ListingCardList