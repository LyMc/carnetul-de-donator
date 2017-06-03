import React from 'react'
import { Container, Content, Text, Card, CardItem, View, Body, Thumbnail, Left, Button,Spinner } from 'native-base'
import appLogo from '../assets/icons/app.png'
import Loading from '../components/Loading'
import VisitCard from '../components/VisitCard'

export default ({ navigation, uid, nextVisit, selectUser, locations, newVisit, editVisit, removeVisit }) => selectUser.size === 0
  ? <Loading message="Actualizare date"/>
  : (
  <Container>
    <Content style={{ padding: 5 }}>
      { nextVisit.size > 0 && nextVisit.map((item, key) => <VisitCard key={ key } item={ item } locations={ locations } edit={ () => editVisit(key) && navigation.navigate('NewSchedule') } remove={ () => removeVisit(key) }/>).toArray() }
      { nextVisit.size === 0 && <Card>
        <CardItem>
          <Left>
            <Thumbnail square size={ 70 } source={ appLogo }/>
            <Body>
              <Text>Programează-te</Text>
              <Text note>Donează sânge, fii generos!</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button info onPress={ () => newVisit() && navigation.navigate('NewSchedule') }>
            <Text>Programează-mă</Text>
          </Button>
        </CardItem>
      </Card> }
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
