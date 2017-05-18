import React from 'react'
import { Text, Card, CardItem, Body, Thumbnail, Left, Right, Button } from 'native-base'
import appLogo from '../assets/icons/app.png'

export default ({ navigation, item, remove }) =>
  <Card>
    { (item.title || item.description) && <CardItem>
      <Left>
        <Thumbnail square size={ 70 } source={ appLogo }/>
        <Body>
        { item.title && <Text>{ item.title }</Text> }
        { item.description && <Text note>{ item.description }</Text> }
        </Body>
      </Left>
    </CardItem> }
    { item.content && <CardItem>
      <Text>{ item.content }</Text>
    </CardItem> }
    { item.type === 1 && <CardItem>
      <Left>
        <Button info onPress={() => navigation.navigate('Schedule')}>
          <Text>Programează-mă</Text>
        </Button>
      </Left>
      <Right>
        <Button info transparent onPress={ remove }>
          <Text>Nu sunt interesat</Text>
        </Button>
      </Right>
    </CardItem> }
    { item.type === 2 && <CardItem>
      <Button info onPress={ remove }>
        <Text>Ok</Text>
      </Button>
    </CardItem> }
  </Card>
