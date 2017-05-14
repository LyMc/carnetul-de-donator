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

const Register = ({
  navigation,
  registerData,
  changeRegisterData, signUp,
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
        <Icon name="md-person" />
        <Input placeholder="Nume" value={registerData.name}
          onChangeText={value => changeRegisterData('name', value)}
        />
      </Item>
      <Item>
        <Icon name="md-at" />
        <Input placeholder="E-mail"  value={registerData.email}
          onChangeText={value => changeRegisterData('email', value)}
        />
      </Item>
      <Item>
        <Icon name="md-lock" />
        <Input placeholder="Parola" secureTextEntry value={registerData.password}
          onChangeText={value => changeRegisterData('password', value)}
        />
      </Item>
    </Form>
    <Button full onPress={ signUp } style={{ margin: 15 }}>
      <Text>Creează cont</Text>
    </Button>
    <Button full transparent onPress={() => navigation.goBack()}
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

export default Register
