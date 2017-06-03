import React from 'react'
import { Container, Content, Text, Card, CardItem, View } from 'native-base'

export default ({ navigation, userLetters, letters }) => (
  <Container>
    <Content style={{ padding: 5 }}>
      { letters.map((letter, key) => (
        <Card key={ key }>
          <CardItem style={{ backgroundColor: '#0a71b2' }} button onPress={() => navigation.navigate('Letter', { title: letter.get('title'), key }) }>
            <View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{ letter.get('title') }</Text>
              <Text note>{ userLetters.has(key) ? 'Citit' : 'Nou' }</Text>
            </View>
          </CardItem>
        </Card>
      )).toArray() }
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
