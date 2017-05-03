import React from 'react'
import {
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation'
import Router from './Router'
import { View } from 'react-native'
import {
  Drawer,
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
  Button,
} from 'native-base'

export default class App extends React.Component {
  constructor() {
    super()
    this.drawer = null
  }
  render() {
    return (
    <NavigationProvider router={Router}>
      <View
        style={{
          height: 24,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      />
      <Drawer
        ref={ (ref) => { this.drawer = ref } }
        content={ <View
          style={{
            backgroundColor: 'green',
            flex: 1,
          }}
        >
        </View> }
        onClose={ () => this.drawer._root.close() }
      >
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={ () => this.drawer._root.open() }
              >
                <Icon name="menu" />
              </Button>
            </Left>
            <Body><Title>Header</Title></Body>
            <Right />
          </Header>
          <StackNavigation initialRoute={'home'} />
        </Container>
      </Drawer>
    </NavigationProvider>
    )
  }
}
