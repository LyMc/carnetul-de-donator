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
class CurrentVisit {
  constructor() {
    this.today = new Date().getTime()
    this.future = true
  }
  check(date) {
    if (!this.future) return false
    if (date > this.today) return true
    else this.future = false
    return false
  }
}

export default ({ navigation, history, locations, editVisit, removeVisit }) => {
  const year = new Year()
  const checkVisit = new CurrentVisit()
  return (
    <Container>
      <Content style={{ padding: 5 }}>
        { history.size === 0 && <Text>Nu există înregistrări în istoric.</Text>}
        { history.map((item, key) => (
          <View key={ key }>
            {year.show(item.get('date')) }
            { item.has('location') && <VisitCard item={ item } locations={ locations } edit={ checkVisit.check(item.get('date')) ? () => editVisit(key) && navigation.navigate('NewSchedule') : null } remove={ checkVisit.check(item.get('date')) ? () => removeVisit(key) : null }/> || <DiseaseCard item={ item } /> }
          </View>
        )).toArray() }
        <View style={{ height: 50 }}/>
      </Content>
    </Container>
  )
}
