import React from 'react'
import { Content, Button, Text, Form, Item, Input, Icon } from 'native-base'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '', email: '', password: '',
    }
  }

  render() {
    const { navigation, signUp } = this.props
    return (
      <Content contentContainerStyle={{ position: 'relative', flex: 1, justifyContent: 'center', paddingBottom: 70 }}>
        <Form style={{ paddingRight: 15 }}>
          <Item>
            <Icon name="md-person"/>
            <Input placeholder="Nume" value={ this.state.name } onChangeText={ name => this.setState({ name }) }/>
          </Item>
          <Item>
            <Icon name="md-at"/>
            <Input keyboardType="email-address" placeholder="E-mail" value={ this.state.email } onChangeText={ email => this.setState({ email })}/>
          </Item>
          <Item>
            <Icon name="md-lock"/>
            <Input placeholder="Parola" secureTextEntry value={ this.state.password } onChangeText={ password => this.setState({ password })}/>
          </Item>
        </Form>
        <Button full onPress={ () => signUp(this.state.email, this.state.password, this.state.name) } style={{ margin: 15 }}>
          <Text>Creează cont</Text>
        </Button>
        <Button full transparent onPress={() => navigation.goBack()} style={{ position: 'absolute', bottom: 15, width: '100%' }}>
          <Text>Am cont</Text>
        </Button>
      </Content>
    )
  }
}
