import React from 'react'
import { Container, Content, View } from 'native-base'
import Header from '../components/Header'
import NotificationCard from '../components/NotificationCard'

export default ({ navigation, notificationsData, remove, refresh }) => (
  <Container>
    <Header navigation={navigation} title="Notificări" refresh={ refresh }/>
    <Content style={{ padding: 5 }}>
      { notificationsData.map((item, key) => <NotificationCard key={ key } item={ item.toObject() } navigation={ navigation } remove={ () => remove(key) } />).toArray() }
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
