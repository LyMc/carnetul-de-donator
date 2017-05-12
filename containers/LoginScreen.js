import React from 'react'
import {
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
} from 'native-base'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      register: true,
    }
  }

  ComponentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log("We are authenticated now!", user)
      }
      console.log('user', user)
    })
  }

  login() {
    firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
    })
  }

  renderLogin() {
    return (
      <Content
        contentContainerStyle={{
          position: 'relative',
          flex: 1,
          justifyContent: 'center',
          paddingBottom: 70,
        }}
      >
        <Form
          style={{
            paddingRight: 15,
          }}
        >
          <Item>
            <Icon name="md-at" />
            <Input placeholder="E-mail" />
          </Item>
          <Item>
            <Icon name="md-lock" />
            <Input placeholder="Parola" secureTextEntry />
          </Item>
        </Form>
        <Button full
          onPress={
            () => firebase.database().ref('users/abc').set(1)
          }
          style={{
            margin: 15,
          }}
        >
          <Text>Autentifică-te</Text>
        </Button>
        <Button full transparent
          onPress={() => this.setState({ register: true })}
          style={{
            position: 'absolute',
            bottom: 15,
            width: '100%',
          }}
        >
          <Text>Creează cont</Text>
        </Button>
      </Content>
    )
  }

  renderRegister() {
    return (
      <Content
        contentContainerStyle={{
          position: 'relative',
          flex: 1,
          justifyContent: 'center',
          paddingBottom: 70,
        }}
      >
        <Form
          style={{
            paddingRight: 15,
          }}
        >
          <Item>
            <Icon name="md-person" />
            <Input placeholder="Nume" />
          </Item>
          <Item>
            <Icon name="md-at" />
            <Input placeholder="E-mail" />
          </Item>
          <Item>
            <Icon name="md-lock" />
            <Input placeholder="Parola" secureTextEntry />
          </Item>
        </Form>
        <Button full
          onPress={
            () => firebase.database().ref('users/abc').set(1)
          }
          style={{
            margin: 15,
          }}
        >
          <Text>Creează cont</Text>
        </Button>
        <Button full transparent
          onPress={() => this.setState({ register: false })}
          style={{
            position: 'absolute',
            bottom: 15,
            width: '100%',
          }}
        >
          <Text>Am cont</Text>
        </Button>
      </Content>
    )
  }

  render() {
    return this.state.register ? this.renderRegister() : this.renderLogin()
  }
}
