import React from 'react'
import { Container, Content, Text, View } from 'native-base'

export default ({ uid }) => (
  <Container>
    <Content style={{ padding: 15 }}>
      <Text>Carnetul donatorului de sânge...</Text>
      <Text>UID: { uid }</Text>
    </Content>
  </Container>
)
