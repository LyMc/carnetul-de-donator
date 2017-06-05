import React from 'react'
import { Container, Content, Text } from 'native-base'

export default class About extends React.Component {
  componentDidMount() {
    this.props.log('Mount', { component: 'About' })
  }
  componentWillUnmount() {
    this.props.log('Unmount', { component: 'About' })
  }
  render() {
    const { uid } = this.props
    return (
      <Container>
        <Content style={{ padding: 15 }}>
          <Text>Carnetul donatorului de sânge...</Text>
          <Text>UID: { uid }</Text>
        </Content>
      </Container>
    )
  }
}
