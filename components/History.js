import React from 'react'
import { Container, Content, Text, View } from 'native-base'
import VisitCard from '../components/VisitCard'
import DiseaseCard from '../components/DiseaseCard'

class Year {
  constructor() {
    this.year = 0
  }
  show(date) {
    const year = new Date(date).getFullYear()
    if (year !== this.year) {
      this.year = year
      return <Text style={{ textAlign: 'center', margin: 5, color: '#aaa' }}>{ year }</Text>
    }
  }
}

export default ({ history }) => {
  const year = new Year()
  return (
    <Container>
      <Content style={{ padding: 5 }}>
        { history.map((item, key) => (
          <View key={ key }>
            {year.show(item.get('date')) }
            { item.has('location') && <VisitCard item={ item }/> || <DiseaseCard item={ item } /> }
          </View>
        )).toArray() }
        <View style={{ height: 50 }}/>
      </Content>
    </Container>
  )
}
