import React from 'react'
import { DatePickerAndroid } from 'react-native'
import { Container, Content, Button, Text, Icon, Form, Input, InputGroup, Item, Label } from 'native-base'
import Header from '../components/Header'
import { getMonth } from '../app/utils'

// @todo: add save and reset button. Add more field.
export default class Profile extends React.Component {
  showPicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'spinner', maxDate: new Date() })
      if (action !== DatePickerAndroid.dismissedAction) {
        this.props.changeSettings('birthday', day + ' ' + getMonth(month) + ' ' + year)
      }
    } catch (error) {
      console.warn('Error', error)
    }
  }

  render() {
    const { navigation, userData, settingsData, doLogout, changeName, changeSettings, refresh } = this.props
    return (
      <Container>
        <Header navigation={navigation} title="Contul meu" refresh={ refresh }/>
        <Content style={{ padding: 5 }}>
          <Form>
            <Item stackedLabel>
              <Label>Nume Prenume</Label>
              <Input disabled value={ userData.name } style={{ paddingLeft: 5 }} onChangeText={ changeName }/>
            </Item>
            <Item stackedLabel>
              <Label>E-mail</Label>
              <Input disabled value={ userData.email } style={{ paddingLeft: 5 }}/>
            </Item>
            <Item stackedLabel button onPress={ this.showPicker.bind(this) }>
              <Label>Ziua de naștere</Label>
              <Input disabled value={ settingsData.birthday } style={{ paddingLeft: 5 }}/>
            </Item>
          </Form>
          <Button transparent full onPress={ doLogout } style={{ marginTop: 50 }}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}