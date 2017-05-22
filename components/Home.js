import React from 'react'
import { Container, Content, Text, Card, CardItem, View } from 'native-base'

import Header from '../components/Header'
import VisitCard from '../components/VisitCard'
import NotificationCard from '../components/NotificationCard'

export default ({ navigation, userData, lastVisit, notificationsData, locationsData, removeNotification, refresh }) => (
  <Container>
    <Header navigation={navigation} title="Acasă" refresh={ refresh }/>
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
      { lastVisit && <VisitCard item={ lastVisit } locations={ lastVisit.city ? locationsData.get(lastVisit.city) : locationsData } />}
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
