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
    <Header navigation={navigation} title="Notificări" />
    <Content>
      <Text>O listă cu notificările primite la care nu s-a răspuns</Text>
    </Content>
  </Container>
)
