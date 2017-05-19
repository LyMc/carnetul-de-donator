import React from 'react'
import {
  Text,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Left,
  View,
} from 'native-base'
import appLogo from '../assets/icons/app.png'
import { getMonth } from '../app/utils'

export default ({ item }) =>
  <Card>
    <CardItem>
      <Left>
        <Thumbnail square size={ 70 } source={ appLogo }/>
        <View style={{
          position: 'absolute', left: 18, top: 4, width: 40, height: 45, backgroundColor: '#0FF0',
        }}>
          <Text style={{
            fontSize: 20, color: '#fff', textAlign: 'center',
          }}>{ new Date(item.date * 1000).getDate() }</Text>
          <Text style={{
            marginLeft: -19, marginTop: -5, fontSize: 12, color: '#fff', textAlign: 'center',
          }}>{ getMonth(new Date(item.date * 1000).getMonth()) }</Text>
        </View>
        <Body>
        <Text>{ item.title }</Text>
        <Text note>{ item.location }</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem>
      <Text>{ item.content }</Text>
    </CardItem>
  </Card>