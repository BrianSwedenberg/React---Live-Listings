import React from 'react'
import {Card, Image, Table} from 'semantic-ui-react'

let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 9,
});

const ListingCard = (props) => {
  // console.log(props.listing)
  const {brandName, familyName, platformName, listPrice, imageLink, link, hasBox, hasPapers} = props.listing
  const listPriceFormatted = dollarUS.format(listPrice)
  return(

    <Card name='listingCard' href={link}>
      <Image centered src={imageLink} />
      <Card.Content>
        <Card.Header as='a' href={link}>{platformName}</Card.Header>
        <Card.Meta>{listPriceFormatted}</Card.Meta>
        <Card.Description>
          Includes Box : {hasBox}
        </Card.Description>
        <Card.Description>
          Includes Papers : {hasPapers}
        </Card.Description>
      </Card.Content>
      {/*    <Card.Content extra>
        <Table celled columns='2' compact basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Includes Box?</Table.HeaderCell>
              <Table.HeaderCell>Includes Papers?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{hasBox}</Table.Cell>
              <Table.Cell>{hasPapers}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content> */}
    </Card>
 ) 
}

export default ListingCard


      // <Card.Content extra>Additional Details</Card.Content> 