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
    return (
      <Container>
        <Content style={{ padding: 15 }}>
          <Text>Carnetul donatorului de sânge are scopul de a informa oamenii prin intermediul mesajelor cu informații utile și noutăți, despre necesitatea donării de sânge. Facilitarea procesului de donare și sporirea numărului de donatori de sânge datorită platformei de programare și a informațiilor despre centrele de transfuzie. Motivarea și stimularea donatorilor activi, a foștilor donatori și a potențialilor donatori de sânge, prin intermediul mesajelor motivaționale și a statisticilor. Asigurarea fluxului de donatori prin intermediul mesajelor de amintire despre perioada în care donatorul din nou poate să doneze sânge și a notificărilor cu diferite informații, de exemplu despre situații excepționale când este nevoie un volum mai mare de sânge.
          </Text>
        </Content>
      </Container>
    )
  }
}
