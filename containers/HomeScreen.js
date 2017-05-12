import React from 'react'
import {
  Content,
  Button,
  Text,
} from 'native-base'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <Content>
        <Text>Carnetul de donator</Text>
        <Button
          onPress={
            () => this.props.navigation.navigate('Login')
          }
        >
          <Text>Login</Text>
        </Button>
      </Content>
    )
  }
}
