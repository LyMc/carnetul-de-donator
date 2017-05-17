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

import VisitCard from '../components/VisitCard'

const lastNotification = {
  title: 'Necesitate donație',
  description: 'Centrul de...',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam amet culpa deserunt et ex impedit maxime mollitia odit, omnis provident, recusandae repudiandae soluta tempore, tenetur vel voluptates? Cum, quae.',
}

export default ({
  navigation,
  userData,
  lastVisit,
}) => (
  <Container>
    <Header navigation={navigation} title="Acasă" />
    <Content style={{ padding: 5 }}>
      <Card>
        <CardItem>
          <Text>Carnetul donatorului de sânge</Text>
        </CardItem>
      </Card>
      {userData.name && <Card>
        <CardItem>
          <Text>Bună {userData.name}.</Text>
        </CardItem>
      </Card> || false}
      <Card>
        <CardItem>
          <Left>
            <Thumbnail square size={ 70 } source={ appLogo } />
            <Body>
            <Text>{ lastNotification.title }</Text>
            <Text note>{ lastNotification.description }</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Text>{ lastNotification.content }</Text>
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
      { lastVisit && <Text style={{textAlign: 'center', margin: 5, color: '#aaa'}}>{ lastVisit.date > new Date().getTime() ? 'următoarea vizită' : 'ultima vizită'}</Text> }
      { lastVisit && <VisitCard item={ lastVisit } />}
      <View style={{ height: 50 }} />
    </Content>
  </Container>
)
