import React from 'react'
import {
  Container,
  Content,
  Button,
  Text,
  Icon,
} from 'native-base'
import Header from '../components/Header'

export default ({ navigation, userData, doLogout }) => (
  <Container>
    <Header navigation={navigation} title="Contul meu" />
    <Content>
      <Text>Detalii despre profil cu posibilitate de editare / adăugare + notificări. Cred că aici vor fi și setările</Text>
      <Text>Name: {userData.name}</Text>
      <Text>E-mail: {userData.email}</Text>
      <Button onPress={ doLogout }>
        <Text>Logout</Text>
      </Button>
    </Content>
  </Container>
)
