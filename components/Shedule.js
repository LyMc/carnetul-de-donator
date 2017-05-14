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
    <Header navigation={navigation} title="Programează-mă" />
    <Content>
      <Text>Formular de programare vizită</Text>
    </Content>
  </Container>
)
