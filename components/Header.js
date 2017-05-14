import React from 'react'
import {
  Header,
  Title,
  Left,
  Right,
  Body,
  Button,
  Icon,
} from 'native-base'

export default ({ navigation, title }) => (
  <Header>
    <Left>
      <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>{ title }</Title>
    </Body>
    <Right />
  </Header>
)
