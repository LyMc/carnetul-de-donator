import React from 'react'
import { Container, Content, Text, Card, CardItem, View, Right, Icon } from 'native-base'
import Loading from '../components/Loading'
import VisitCard from '../components/VisitCard'
import DiseaseCard from '../components/DiseaseCard'

export default class About extends React.Component {
  componentDidMount() {
    this.props.log('Mount', { component: 'Home' })
  }
  componentWillUnmount() {
    this.props.log('Unmount', { component: 'Home' })
  }
  render() {
    const { navigation, nextVisit, selectUser, locations, currentDiseases, userLetters, letters, newVisit, editVisit, removeVisit, openDisease, removeDisease } = this.props
    return selectUser.size === 0
      ? <Loading message="Actualizare date"/>
      : (
        <Container>
          <Content style={{ padding: 5 }}>
            { userLetters.has('--welcome') && <Card style={{ backgroundColor: '#0a71b2' }}>
              <CardItem style={{ backgroundColor: '#0a71b2' }} button onPress={() => navigation.navigate('Letter', { title: letters.getIn(['--welcome', 'title']), key: '--welcome' }) }>
                <View style={{ width: 50 }}>
                  <Icon name="md-mail" style={{ color: '#fff' }}/>
                </View>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{ letters.getIn(['--welcome', 'title']) }</Text>
                  <Text note>Nou</Text>
                </View>
              </CardItem>
            </Card> }
            { nextVisit.size > 0 && nextVisit.map((item, key) => <VisitCard key={ key } item={ item } locations={ locations } edit={ () => editVisit(key) && navigation.navigate('NewSchedule') } remove={ () => removeVisit(key) }/>).toArray() }
            { currentDiseases.size > 0 && currentDiseases.map((item, key) => <DiseaseCard key={ key } item={ item } edit={ () => openDisease(key) && navigation.navigate('Disease') } remove={ () => removeDisease(key) }/>).toArray() }
            <View>
              <Text style={{ paddingTop: 15, fontSize: 24 }}>Acționează!</Text>
            </View>
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
                  <Text>Istoric medical</Text>
                  <Text note>Adaugă notiță</Text>
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
  }
}
