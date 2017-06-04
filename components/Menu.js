import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'native-base'
import MenuImage from '../assets/images/menu.jpg'
import Logo from '../assets/icons/app.png'

export default () => (
  <View style={{ width: '100%', height: 200, backgroundColor: '#f76', alignItems: 'center' }}>
    <Image source={ MenuImage } style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 200 }}/>
    <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 200, backgroundColor: '#000b' }}/>
    <Image source={ Logo } style={{ width: 50, height: 50, marginTop: 15 }}/>
    <Text style={{ color: '#fff', fontSize: 36, lineHeight: 38 }}>CARNETUL</Text>
    <Text style={{ color: '#fff', fontSize: 36, lineHeight: 38 }}>DONATORULUI</Text>
    <Text style={{ color: '#fff', fontSize: 36, lineHeight: 38 }}>DE SÂNGE</Text>
  </View>
)
