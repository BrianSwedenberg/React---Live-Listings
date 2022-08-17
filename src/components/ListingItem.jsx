import React from 'react'
import {Card, Item, Image} from 'semantic-ui-react'

const ListingItem = (props) => {
  console.log(props.listing)
  const {brand, family, platform, listPrice, imgUrl, link} = props.listing
  return(
    /*
    <Card
      image='https://cdn2.chrono24.com/images/uhren/16200599-4qmlxkfjx2yxlogf92r9zt1r-ExtraLarge.jpg'
      header='Sample Listing Card'
      meta='Listing'
      description='This is a sample card that I have made'
    />
    */
   <Item name='listingItem'>
      <Item.Image size='small' src={imgUrl} />
      <Item.Content>
        <Item.Header as='a' href={link}>{platform}</Item.Header>
        <Item.Meta>{listPrice}</Item.Meta>
        <Item.Description>
           This is a {brand} {family} listed on {platform} for {listPrice}
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
 ) 
}

export default ListingItem