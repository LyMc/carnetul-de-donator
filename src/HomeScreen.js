import React from 'react'
import {
  Content,
  Button,
  Text,
} from 'native-base'

export default (props) => (
  <Content>
    <Button
      onPress={
        () => props.navigator.push('about')
      }
    >
      <Text>Work!</Text>
    </Button>
  </Content>
)
