import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation'
import Router from './Router'

export default class App extends React.Component {
  render() {
    return (
    <NavigationProvider router={Router}>
      <StackNavigation initialRoute={'home'} />
    </NavigationProvider>
    )
  }
}
