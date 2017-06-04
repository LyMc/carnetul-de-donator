import React from 'react'
import { Container, Content, Text, Card, CardItem, View, Body, Thumbnail, Left, Right, Button, Icon } from 'native-base'
import Loading from '../components/Loading'
import VisitCard from '../components/VisitCard'
import DiseaseCard from '../components/DiseaseCard'

export default ({ navigation, uid, nextVisit, selectUser, locations, currentDiseases, newVisit, editVisit, removeVisit, openDisease, removeDisease }) => selectUser.size === 0
  ? <Loading message="Actualizare date"/>
  : (
  <Container>
    <Content style={{ padding: 5 }}>
      { nextVisit.size > 0 && nextVisit.map((item, key) => <VisitCard key={ key } item={ item } locations={ locations } edit={ () => editVisit(key) && navigation.navigate('NewSchedule') } remove={ () => removeVisit(key) }/>).toArray() }
      { currentDiseases.size > 0 && currentDiseases.map((item, key) => <DiseaseCard key={ key } item={ item } edit={ () => openDisease(key) && navigation.navigate('Disease') } remove={ () => removeDisease(key) }/>).toArray() }
      { nextVisit.size === 0 && <Card style={{ marginLeft: 50 }}>
        <CardItem button onPress={ () => newVisit() && navigation.navigate('NewSchedule') }>
          <View>
            <Text>Programează-te</Text>
            <Text note>Donează sânge, fii generos!</Text>
          </View>
          <Right>
            <Icon name="md-create"/>
          </Right>
        </CardItem>
      </Card> }
      <Card style={{ marginLeft: 50 }}>
        <CardItem button onPress={ () => openDisease() && navigation.navigate('Disease') }>
          <View>
            <Text>Boala</Text>
            <Text note>Notează boala</Text>
          </View>
          <Right>
            <Icon name="md-create"/>
          </Right>
        </CardItem>
      </Card>
      <Card style={{ marginLeft: 50 }}>
        <CardItem button onPress={ () => navigation.navigate('Profile') }>
          <View>
            <Text>Contul meu</Text>
            <Text note>Completează-l acum</Text>
          </View>
          <Right>
            <Icon name="md-create"/>
          </Right>
        </CardItem>
      </Card>
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
