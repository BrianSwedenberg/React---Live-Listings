import React from 'react'
import {Card, Item, Image} from 'semantic-ui-react'

let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

const ListingCard = (props) => {
  console.log(props.listing)
  const {brandName, familyName, platformName, listPrice, imageLink, link} = props.listing
  const listPriceFormatted = dollarUS.format(listPrice)
  return(
    /*
    <Card
      image='https://cdn2.chrono24.com/images/uhren/16200599-4qmlxkfjx2yxlogf92r9zt1r-ExtraLarge.jpg'
      header='Sample Listing Card'
      meta='Listing'
      description='This is a sample card that I have made'
    />
    */
    <Card name='listingCard'>
      <Image size='small' centered src={imageLink} />
      <Card.Content>
        <Card.Header as='a' href={link}>{platformName}</Card.Header>
        <Card.Meta>{listPriceFormatted}</Card.Meta>
        <Card.Description>
           This is a {brandName} {familyName} listed on {platformName} for {listPriceFormatted}
        </Card.Description>
      </Card.Content>
    </Card>
 ) 
}

export default ListingCard


      // <Card.Content extra>Additional Details</Card.Content> 