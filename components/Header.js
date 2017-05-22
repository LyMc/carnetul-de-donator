import React from 'react'
import { Header, Title, Left, Right, Body, Button, Icon } from 'native-base'

export default ({ navigation, title, refresh }) => (
  <Header>
    <Left>
      <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="menu"/>
      </Button>
    </Left>
    <Body>
    <Title>{ title }</Title>
    </Body>
    <Right>
      { refresh && <Button transparent onPress={ refresh }>
        <Icon name="md-refresh"/>
      </Button> }
    </Right>
  </Header>
)
