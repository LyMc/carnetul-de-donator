import React from 'react'
import { Container, Content, Button, Text, Form, Item, Input, Icon, Card, CardItem, Body, Thumbnail, Left, Right, View } from 'native-base'

import appLogo from '../assets/icons/app.png'
import Header from '../components/Header'
import VisitCard from '../components/VisitCard'
import NotificationCard from '../components/NotificationCard'

export default ({ navigation, userData, lastVisit, notificationsData, removeNotification }) => (
  <Container>
    <Header navigation={navigation} title="Acasă"/>
    <Content style={{ padding: 5 }}>
      {userData.name && <Card>
        <CardItem>
          <Text>Bună {userData.name}.</Text>
        </CardItem>
      </Card> || false}
      { notificationsData.size > 0 && <Text style={{
        textAlign: 'center',
        margin: 5,
        color: '#aaa',
      }}>Notificări</Text> }
      { notificationsData.map((item, key) => <NotificationCard key={ key } item={ item.toObject() } navigation={ navigation } remove={ () => removeNotification(key) } />).toArray() }
      { lastVisit && <Text style={{
        textAlign: 'center',
        margin: 5,
        color: '#aaa',
      }}>{ lastVisit.date * 1000 > new Date().getTime() ? 'următoarea vizită' : 'ultima vizită'}</Text> }
      { lastVisit && <VisitCard item={ lastVisit }/>}
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
