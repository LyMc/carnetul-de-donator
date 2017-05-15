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
  Card,
  CardItem,
  Body,
  Thumbnail,
  Left,
  Right,
  View,
} from 'native-base'
import Header from '../components/Header'
import appLogo from '../assets/icons/app.png'

const data = [
  {
    key: 1,
    title: 'Necesitate donație',
    description: 'Centrul de...',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam amet culpa deserunt et ex impedit maxime mollitia odit, omnis provident, recusandae repudiandae soluta tempore, tenetur vel voluptates? Cum, quae.',
  }, {
    key: 2,
    title: 'Necesitate donație',
    description: 'Centrul de...',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam amet culpa deserunt et ex impedit maxime mollitia odit, omnis provident, recusandae repudiandae soluta tempore, tenetur vel voluptates? Cum, quae.',
  },
]

export default ({
  navigation,
  userData,
}) => (
  <Container>
    <Header navigation={navigation} title="Notificări" />
    <Content style={{ padding: 5 }}>
      { data && data.map(item => (
        <Card key={ item.key }>
          <CardItem>
            <Left>
              <Thumbnail square size={ 70 } source={ appLogo } />
              <Body>
                <Text>{ item.title }</Text>
                <Text note>{ item.description }</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Text>{ item.content }</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Button info onPress={() => navigation.navigate('Schedule')}>
                <Text>Programează-mă</Text>
              </Button>
            </Left>
            <Right>
              <Button info transparent>
                <Text>Nu sunt interesat</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      ))}
      <View style={{ height: 50 }} />
    </Content>
  </Container>
)
