import React from 'react'
import { Container, Content, Text, Card, CardItem, View } from 'native-base'

export default ({ userLetters, letters, letterCategories }) => (
  <Container>
    <Content style={{ padding: 5 }}>
      { letterCategories.map((catLetters, catName) => (
        <View key={ catName }>
          <Text style={{ margin: 5, color: '#aaa' }}>{ catName }</Text>
          { catLetters.map((_, letterKey) => (
            <Card key={ letterKey }>
              <CardItem>
                <Text>{ letters.getIn([letterKey, 'title']) }</Text>
                <Text note>{ userLetters.has(letterKey) ? 'Read' : 'New' }</Text>
              </CardItem>
              <CardItem>
                <Text>{ letters.getIn([letterKey, 'content']) }</Text>
              </CardItem>
            </Card>
          )).toArray() }
        </View>
      )).toArray() }
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
