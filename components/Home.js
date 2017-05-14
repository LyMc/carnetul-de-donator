import React from 'react'
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
} from 'native-base'
import Header from '../components/Header'

export default ({
  navigation,
  userData,
}) => (
  <Container>
    <Header navigation={navigation} title="Acasă" />
    <Content>
      <Text>Carnetul donatorului de sânge</Text>
      <Text>Bună {userData.name}.</Text>
    </Content>
  </Container>
)
