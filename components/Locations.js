import React from 'react'
import { Container, Content, View } from 'native-base'
import Header from '../components/Header'
import LocationCard from '../components/LocationCard'

export default ({ navigation, locationsData, refresh, changeLocation }) => (
  <Container>
    <Header navigation={navigation} title="Locații" refresh={ refresh }/>
    <Content style={{ padding: 5 }}>
      { locationsData.map((item, key) => <LocationCard key={ key } item={ item.toJS() } set={ () => {
        changeLocation(key)
        navigation.navigate('Schedule')
      } } />).toArray() }
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
