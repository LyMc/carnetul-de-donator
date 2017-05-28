import React from 'react'
import { Container, Content, Text, Card, CardItem, View } from 'native-base'

export default ({ uid }) => (
  <Container>
    <Content style={{ padding: 5 }}>
      { uid && <Card>
        <CardItem>
          <Text>User ID: { uid }</Text>
        </CardItem>
      </Card> }
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
