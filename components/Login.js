import React from 'react'
import {
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
} from 'native-base'

const Login = ({
  navigation,
  loginData,
  changeLoginData, doLogin,
}) => (
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
        <Input placeholder="E-mail" value={loginData.email}
          onChangeText={value => changeLoginData('email', value)}
        />
      </Item>
      <Item>
        <Icon name="md-lock" />
        <Input placeholder="Parola" secureTextEntry value={loginData.password}
          onChangeText={value => changeLoginData('password', value)}
        />
      </Item>
    </Form>
    <Button full
      onPress={ doLogin }
      style={{
        margin: 15,
      }}
    >
      <Text>Autentifică-te</Text>
    </Button>
    <Button full transparent
      onPress={() => navigation.navigate('Register')}
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

export default Login
