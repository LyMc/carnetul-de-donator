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

const lastNotification = {
  title: 'Necesitate donație',
  description: 'Centrul de...',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam amet culpa deserunt et ex impedit maxime mollitia odit, omnis provident, recusandae repudiandae soluta tempore, tenetur vel voluptates? Cum, quae.',
}
const lastVisit = {
  day: 22,
  month: 'apr',
  title: 'Donație 450ml',
  description: 'Centrul de transfuzie sanguină București',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur commodi, dolore dolorum ducimus eius eos illo impedit labore officiis porro provident quia quibusdam repellat sequi veniam voluptas, voluptate voluptates.',
}

export default ({
  navigation,
  userData,
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
      <Card>
        <CardItem>
          <Left>
            <Thumbnail square size={ 70 } source={ appLogo } />
            <View style={{
              position: 'absolute',
              left: 13,
              top: 5,
              width: 30,
              height: 45,
            }}>
              <Text style={{
                fontSize: 20,
                color: '#fff',
                textAlign: 'center',
              }}>{ lastVisit.day }</Text>
              <Text style={{
                fontSize: 12,
                color: '#fff',
                textAlign: 'center',
              }}>{ lastVisit.month }</Text>
            </View>
            <Body>
            <Text>{ lastVisit.title }</Text>
            <Text note>{ lastVisit.description }</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Text>{ lastVisit.content }</Text>
        </CardItem>
      </Card>
      <View style={{ height: 50 }} />
    </Content>
  </Container>
)
