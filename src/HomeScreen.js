import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default (props) => (
  <View style={styles.container}>
    <Text
      onPress={
        () => props.navigator.push('about')
      }
    >Work!</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
