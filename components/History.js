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
  View,
} from 'native-base'
import Header from '../components/Header'

import VisitCard from '../components/VisitCard'

export default ({ navigation, historyData, locationsData, refresh }) => {
  return (
    <Container>
      <Header navigation={navigation} title="Istoric" refresh={ refresh }/>
      <Content style={{padding: 5}}>
        { historyData && historyData.map((yearVisits, year) =>
          <View key={ year }>
            <Text style={{textAlign: 'center', margin: 5, color: '#aaa'}}>{ year }</Text>
            { yearVisits.reverse().map((item, key) =>
              <VisitCard key={ key } item={ item.toObject() } locations={ locationsData } />
            ).toArray() }
          </View>
        ).toArray() }
        <View style={{height: 50}}/>
      </Content>
    </Container>
  )
}
