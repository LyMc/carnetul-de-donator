import React from 'react'
import { Container, Content, Text, Card, CardItem, View } from 'native-base'

export default class About extends React.Component {
  componentDidMount() {
    this.props.log('Mount', { component: 'Letters' })
  }
  componentWillUnmount() {
    this.props.log('Unmount', { component: 'Letters' })
  }
  render() {
    const { navigation, userLetters, letters } = this.props
    return (
      <Container>
        <Content style={{ padding: 5 }}>
          { letters.map((letter, key) => (
            <Card key={ key } style={{ backgroundColor: '#0a71b2' }}>
              <CardItem style={{ backgroundColor: '#0a71b2' }} button onPress={() => navigation.navigate('Letter', { title: letter.get('title'), key }) }>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{ letter.get('title') }</Text>
                </View>
              </CardItem>
            </Card>
          )).toArray() }
          <View style={{ height: 50 }}/>
        </Content>
      </Container>
    )
  }
}