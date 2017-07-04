import React from 'react'
import { Container, Content, Text, Card, CardItem, View, Left, Right, Body, Icon, Button } from 'native-base'
import Loading from '../components/Loading'
import VisitCard from '../components/VisitCard'
import DiseaseCard from '../components/DiseaseCard'

const replacePlaceholders = (message, name, profile) => message.split('%NUME%').join(name).split('%GRUPA%').join(profile.blood).split('%RH%').join(profile.rh)

export default class About extends React.Component {
  componentDidMount() {
    this.props.log('Mount', { component: 'Home' })
  }
  componentWillUnmount() {
    this.props.log('Unmount', { component: 'Home' })
  }
  render() {
    const { navigation, nextVisit, selectUser, locations, currentDiseases, userLetters, letters, newVisit, editVisit, removeVisit, openDisease, removeDisease, notifications, profile, settings, removeNotification, removeLetter } = this.props
    return selectUser.size === 0
      ? <Loading message="Actualizare date"/>
      : (
        <Container>
          <Content style={{ padding: 5 }}>
            { notifications.filter((notification, key) => ['BASIC', 'BLOOD', 'EXPO_TOKEN'].indexOf(key) === -1).map((notification, key) => (
              <Card key={ key } style={{  }}>
                <CardItem>
                  <Left>
                    <Icon name="md-text" />
                    <Body>
                      <Text>{ notification && notification.get('title') }</Text>
                    </Body>
                  </Left>
                </CardItem>
                { notification && notification.get('message') && <CardItem>
                  <Text note>{ replacePlaceholders(notification.get('message'), settings.get('name'), profile) }</Text>
                </CardItem> || false }
                <CardItem>
                  { nextVisit.size === 0 && <Button info onPress={ () => newVisit() && navigation.navigate('NewSchedule') } style={{ marginRight: 15 }}><Text>Programează-mă</Text></Button> }
                  <Button info bordered onPress={ () => removeNotification(key) }><Text>Șterge</Text></Button>
                </CardItem>
              </Card>
            )).toArray() }
            { userLetters.has('--welcome') && <Card style={{ backgroundColor: '#0a71b2' }}>
              <CardItem style={{ backgroundColor: '#0a71b2' }} button onPress={() => navigation.navigate('Letter', { title: letters.getIn(['--welcome', 'title']), key: '--welcome' }) && removeLetter('--welcome') }>
                <View style={{ width: 50 }}>
                  <Icon name="md-mail" style={{ color: '#fff' }}/>
                </View>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{ letters.getIn(['--welcome', 'title']) }</Text>
                  <Text note>Mesaj nou</Text>
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
            { !(Object.keys(profile).length === 5 && profile.blood && profile.rh && profile.weight && profile.birthday && profile.sex) && <Card style={{ marginLeft: 50 }}>
              <CardItem button onPress={ () => navigation.navigate('Profile') }>
                <View>
                  <Text>Contul meu</Text>
                  <Text note>Completează-l acum</Text>
                </View>
                <Right>
                  <Icon name="md-create"/>
                </Right>
              </CardItem>
            </Card> }
            <View style={{ height: 50 }}/>
          </Content>
        </Container>
      )
  }
}
