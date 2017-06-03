import React from 'react'
import { Container, Content, View, Text } from 'native-base'
import Markdown from 'react-native-simple-markdown'
import Loading from '../components/Loading'

export default class Letter extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 0)
  }
  componentWillUnmount() {
    this.setState({ loaded: false })
  }
  render() {
    return (
      <Container>
        <Content style={{ padding: 5 }}>
          { this.state.loaded && <Markdown>{ this.props.letters.getIn([this.props.navigation.state.params.key, 'content']) }</Markdown> || <Loading message="Se încarcă..."/>}
          <View style={{ height: 50 }}/>
        </Content>
      </Container>
    )
  }
}
