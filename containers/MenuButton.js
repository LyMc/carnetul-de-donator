import React from 'react'
import { Button, Icon } from 'native-base'

export default ({ navigation, showMenu }) => showMenu
  ? <Button transparent onPress={ () => navigation.navigate('DrawerOpen') }><Icon name="menu" style={{ color: '#fff' }}/></Button>
  : <Button transparent onPress={ () => navigation.goBack() }><Icon name="md-arrow-back" style={{ color: '#fff' }}/></Button>
