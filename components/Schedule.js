import React from 'react'
import { DatePickerAndroid, TimePickerAndroid } from 'react-native'
import { Container, Button, Text, Form, Input, Item, ListItem, Label, View, Picker, CheckBox, Switch } from 'native-base'
import KeyboardHandler from '../app/KeyboardHandler'
import Header from '../components/Header'
import { getMonth } from '../app/utils'

export default class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      date: {},
      time: {},
    }
  }
  showDatePicker = async () => {
    try {
      const d = this.state.date
      const minDate = new Date()
      const date = d.day && d.year && (new Date(d.year, d.month, d.day)) || minDate
      const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'calendar', date, minDate })
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          date: { day, month, year }
        })
      }
    } catch (error) {
      console.warn('Error', error)
    }
  }
  showTimePicker = async () => {
    try {
      const time = this.state.time
      const { action, hour, minute } = await TimePickerAndroid.open({ is24Hour: true, hour: time.hour, minute: time.minute })
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({
          time: { hour, minute }
        })
      }
    } catch (error) {
      console.warn('Error', error)
    }
  }
  renderDate(date) {
    const year = new Date().getFullYear() === date.year ? '' : ' ' + date.year
    return Object.keys(date).length ? date.day + ' ' + getMonth(date.month) + year : ''
  }
  renderTime(time) {
    return time.hour >= 0 ? ('0' + time.hour).slice(-2) + ':' + ('0' + time.minute).slice(-2) : ''
  }
  render() {
    const { navigation, settingsData, locationsData, changeSettings, refresh, save } = this.props
    return (
      <Container>
        <Header navigation={navigation} title="Contul meu" refresh={ refresh }/>
        <KeyboardHandler ref='kh' offset={ 80 }>
          <Form>
            <Item stackedLabel>
              <Label style={{ paddingLeft: 7 }}>Oraș</Label>
              <Picker
                style={{ width: '100%' }}
                supportedOrientations={[ 'portrait', 'landscape' ]}
                iosHeader="Oraș"
                mode="dialog"
                selectedValue={ settingsData.city }
                onValueChange={ (value) => changeSettings('city', value) }
              >
                { locationsData.map((_, city) => <Picker.Item key={ city } label={ city } value={ city } />).toArray()}
              </Picker>
            </Item>
            <Item stackedLabel>
              <Label style={{ paddingLeft: 7 }}>Locație</Label>
              <Picker
                style={{ width: '100%' }}
                supportedOrientations={[ 'portrait', 'landscape' ]}
                iosHeader="Locație"
                mode="dialog"
                selectedValue={ settingsData.location }
                onValueChange={ (value) => changeSettings('location', value) }
              >
                { settingsData.city && locationsData.get(settingsData.city).map((location, key) => <Picker.Item key={ key } label={location.get('name')} value={ key } />).toArray()}
              </Picker>
            </Item>
            <Item stackedLabel button onPress={ this.showDatePicker.bind(this) }>
              <Label style={{ paddingLeft: 7 }}>Data</Label>
              <Input disabled value={ this.renderDate(this.state.date) } style={{ paddingLeft: 12 }}/>
            </Item>
            <Item stackedLabel button onPress={ this.showTimePicker.bind(this) }>
              <Label style={{ paddingLeft: 7 }}>Ora</Label>
              <Input disabled value={ this.renderTime(this.state.time) } style={{ paddingLeft: 12 }}/>
            </Item>
          </Form>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 22 }}>
            <Button info onPress={ () => {
              this.setState({date: {}, time: {}})
              save({year: this.state.date.year, date: new Date(this.state.date.year, this.state.date.month, this.state.date.day, this.state.time.hour, this.state.time.minute).getTime() / 1000 })
            } } disabled={ !this.state.time.hour || !this.state.date.year }>
              <Text>Salvează</Text>
            </Button>
          </View>
        </KeyboardHandler>
      </Container>
    )
  }
}
