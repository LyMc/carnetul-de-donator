import React from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text } from 'native-base'

export default ({ message }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    <ActivityIndicator/>
    <Text style={{ color: '#999', fontSize: 14 }}>{ message }</Text>
  </View>
)
