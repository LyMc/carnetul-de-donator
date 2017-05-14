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
    <Header navigation={navigation} title="Istoric" />
    <Content>
      <Text>O listă cu istoricul de donații</Text>
    </Content>
  </Container>
)
