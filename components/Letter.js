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
    this.props.log('Mount', { component: 'Letter', key: this.props.navigation.state.params.key, title: this.props.navigation.state.params.title })
  }
  componentWillUnmount() {
    this.setState({ loaded: false })
    this.props.log('Unmount', { component: 'Letter' })
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
