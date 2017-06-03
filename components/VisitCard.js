import React from 'react'
import { MapView } from 'expo'
import { Linking } from 'react-native'
import { Text, Card, CardItem, Body, Thumbnail, Left, View, Button, Icon } from 'native-base'
import appLogo from '../assets/icons/app.png'
import { getMonth } from '../app/utils'

export default ({ item, locations, edit, remove }) => {
  const date = new Date(item.get('date'))
  const location = locations ? locations.get(item.get('location')) : null
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail square size={ 70 } source={ appLogo }/>
          <View style={{ position: 'absolute', left: 18, top: 4, width: 40, height: 45, backgroundColor: '#0FF0' }}>
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              { date.getDate() }
            </Text>
            <Text style={{ marginLeft: -19, marginTop: -5, fontSize: 12, color: '#fff', textAlign: 'center' }}>
              { getMonth(date.getMonth()) }
            </Text>
          </View>
          <Body>
          <Text>Vizită donație</Text>
          <Text note>{ item.get('status') }</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem style={{ flexWrap: 'wrap' }}>
        <Icon name="md-time" />
        <Text>Ora: { ('0' + date.getUTCHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) } { location && '(Deschis: ' + location.get('hours').split(';')[date.getDay()] + ')'}</Text>
      </CardItem>
      { location && <CardItem button onPress={ () => Linking.openURL(location.get('addressLink')) }>
        <Icon name="home" />
        <Text>{ location.get('address') }</Text>
      </CardItem> }
      { location && <CardItem button onPress={ () => Linking.openURL('tel:' + location.get('phone')) }>
        <Icon name="md-call" />
        <Text>{ location.get('phone') }</Text>
      </CardItem> }
      { location && <CardItem button onPress={ () => Linking.openURL(location.get('website')) }>
        <Icon name="md-globe" info/>
        <Text>{ location.get('website') }</Text>
      </CardItem> }
      { location && location.get('latitude') && <CardItem cardBody>
        <MapView
          style={{ height: 200, width: '100%' }}
          initialRegion={{ latitude: location.get('latitude'), longitude: location.get('longitude'), latitudeDelta: 0.006, longitudeDelta: 0.006 }}
          onPress={ () => Linking.openURL(location.get('addressLink')) }
        >
          <MapView.Marker
            coordinate={{ latitude: location.get('latitude'), longitude: location.get('longitude') }}
          />
        </MapView>
      </CardItem> }
      { (edit || remove) && item.get('status') === 'Programare' && <CardItem>
        { edit && <Button info onPress={ edit } style={{ marginRight: 15 }}>
          <Text>Editează</Text>
        </Button> }
        { remove && <Button info bordered onPress={ remove }>
          <Text>Anulează</Text>
        </Button> }
      </CardItem> }
    </Card>
  )
}