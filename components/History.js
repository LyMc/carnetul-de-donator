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

const currentYearConst = new Date().getFullYear()

export default ({ navigation, historyData, currentData }) => {
  let lastYear = 0
  return (
    <Container>
      <Header navigation={navigation} title="Istoric"/>
      <Content style={{padding: 5}}>
        { currentData && currentData.map(item => (
          <View key={ item.key }>
            { <Text style={{textAlign: 'center', margin: 5, color: '#aaa'}}>vizite viitoare</Text> }
            <VisitCard item={ item } />
          </View>
        )) }
        { historyData && historyData.map(item => {
          let currentYear = new Date(item.date).getFullYear()
          let showCurrentYear = false
          if (lastYear !== currentYear) {
            showCurrentYear = true
            lastYear = currentYear
            if (currentYearConst === currentYear) {
              currentYear = 'vizite mai vechi'
            }
            if (currentYearConst === currentYear + 1) {
              currentYear = 'acum un an'
            }
          }
          return (
            <View key={ item.key }>
              { showCurrentYear && <Text style={{textAlign: 'center', margin: 5, color: '#aaa'}}>{ currentYear }</Text> }
              <VisitCard item={ item } />
            </View>
          )
        }) }
        <View style={{height: 50}}/>
      </Content>
    </Container>
  )
}