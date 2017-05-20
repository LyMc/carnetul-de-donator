import React from 'react'
import { MapView } from 'expo'
import { Linking } from 'react-native'
import { Text, Card, CardItem, Left, Right, Button, Icon } from 'native-base'

export default class LocationCard extends React.Component {
  constructor() {
    super()
    this.state = {
      showFullProgram: false,
    }
  }

  render() {
    const { item, set } = this.props
    return (
      <Card>
        <CardItem header style={{ backgroundColor: '#0a71b2' }}>
          <Text style={{ fontWeight: '700', fontSize: 18, color: '#fff' }}>{ item.name }</Text>
        </CardItem>
        <CardItem button onPress={ () => Linking.openURL(item.addressLink) }>
          <Icon name="home" />
          <Text>{ item.address }</Text>
        </CardItem>
        <CardItem button onPress={ () => this.setState({ showFullProgram: !this.state.showFullProgram }) }>
          <Icon name="md-time" />
          { this.state.showFullProgram
            ? <Text>{ item.program }</Text>
            : <Text>{ item.program }</Text>
          }
          { this.state.showFullProgram || <Right><Icon name="md-arrow-dropdown"/></Right> }
        </CardItem>
        <CardItem button onPress={ () => Linking.openURL('tel:' + item.phone) }>
          <Icon name="md-call" />
          <Text>{ item.phone }</Text>
        </CardItem>
        <CardItem button onPress={ () => Linking.openURL(item.link) }>
          <Icon name="md-globe" info/>
          <Text>{ item.link }</Text>
        </CardItem>
        { item.initialRegion && <CardItem cardBody>
          <MapView
            liteMode
            style={{ height: 200, width: '100%' }}
            initialRegion={ item.initialRegion }
            onPress={ () => Linking.openURL(item.addressLink) }
          >
            <MapView.Marker
              coordinate={ item.initialRegion }
            />
          </MapView>
        </CardItem> }
        <CardItem>
          <Left>
            <Button info onPress={ set }>
              <Text>Programează-mă</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    )
  }
}