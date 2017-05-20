import React from 'react'
import { DatePickerAndroid } from 'react-native'
import { Container, Button, Text, Form, Input, Item, ListItem, Label, View, Picker, CheckBox, Switch } from 'native-base'
import KeyboardHandler from '../app/KeyboardHandler'
import Header from '../components/Header'
import { getMonth } from '../app/utils'

export default class Profile extends React.Component {
  showPicker = async () => {
    try {
      const b = this.props.settingsData.birthday
      const date = b.day && b.year && b.month && (new Date(b.year, b.month, b.day)) || (new Date())
      const maxDate = new Date()
      const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'spinner', date, maxDate })
      if (action !== DatePickerAndroid.dismissedAction) {
        this.props.changeSettings('birthday', { day, month, year })
      }
    } catch (error) {
      console.warn('Error', error)
    }
  }

  renderBirthday(birthday) {
    return Object.keys(birthday).length ? birthday.day + ' ' + getMonth(birthday.month) + ' ' + birthday.year : ''
  }

  render() {
    const { navigation, userData, settingsData, locationsData, doLogout, changeName, changeSettings, refresh, save } = this.props
    return (
      <Container>
        <Header navigation={navigation} title="Contul meu"/>
        <KeyboardHandler ref='kh' offset={ 80 }>
          <Form>
            <Item stackedLabel>
              <Label style={{ paddingLeft: 7 }}>Nume Prenume</Label>
              <Input value={ userData.name } style={{ paddingLeft: 12 }} onChangeText={ changeName } ref='name' onFocus={() => this.refs.kh.inputFocused(this, 'name')}/>
            </Item>
            <Item stackedLabel>
              <Label style={{ paddingLeft: 7 }}>E-mail</Label>
              <Input disabled value={ userData.email } style={{ paddingLeft: 12 }}/>
            </Item>
            <Item stackedLabel button onPress={ this.showPicker.bind(this) }>
              <Label style={{ paddingLeft: 7 }}>Ziua de naștere</Label>
              <Input disabled value={ this.renderBirthday(settingsData.birthday) } style={{ paddingLeft: 12 }}/>
            </Item>
            <Item stackedLabel>
              <Label style={{ paddingLeft: 7 }}>Sex</Label>
              <Picker
                style={{ width: '100%' }}
                supportedOrientations={[ 'portrait', 'landscape' ]}
                iosHeader="Alege sex"
                mode="dropdown"
                selectedValue={ settingsData.sex }
                onValueChange={ (value) => changeSettings('sex', value) }
              >
                <Picker.Item label="" value="0"/>
                <Picker.Item label="Masculin" value="1"/>
                <Picker.Item label="Feminin" value="2"/>
              </Picker>
            </Item>
            <Item stackedLabel>
              <Label style={{ paddingLeft: 7 }}>Oraș</Label>
              <Input value={ settingsData.city } style={{ paddingLeft: 12 }} onChangeText={(value) => changeSettings('city', value)} ref='city' onFocus={() => this.refs.kh.inputFocused(this, 'city')}/>
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
                { locationsData.map((location, key) => <Picker.Item key={ key } label={location.get('name')} value={ key } />).toArray()}
              </Picker>
            </Item>
            <Item stackedLabel>
              <Label style={{ paddingLeft: 7 }}>Greutate</Label>
              <Input keyboardType="numeric" value={ settingsData.weight } style={{ paddingLeft: 12 }} onChangeText={(value) => changeSettings('weight', value)} ref="weight" onFocus={() => this.refs.kh.inputFocused(this, 'weight')}/>
            </Item>
            <Item stackedLabel style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
              <Label style={{ paddingLeft: 7, width: '100%' }}>Grupa Sanguină</Label>
              <Picker
                style={{ width: 110 }}
                supportedOrientations={[ 'portrait', 'landscape' ]}
                iosHeader="Grupa"
                mode="dropdown"
                selectedValue={ settingsData.blood }
                onValueChange={ (value) => changeSettings('blood', value) }
              >
                <Picker.Item label="Grupa" value="0"/>
                <Picker.Item label="0" value="1"/>
                <Picker.Item label="A" value="2"/>
                <Picker.Item label="B" value="3"/>
                <Picker.Item label="AB" value="4"/>
              </Picker>
              <Picker
                style={{ width: 90, marginLeft: 15 }}
                supportedOrientations={[ 'portrait', 'landscape' ]}
                iosHeader="RH"
                mode="dropdown"
                selectedValue={ settingsData.rh }
                onValueChange={ (value) => changeSettings('rh', value) }
              >
                <Picker.Item label="RH" value=""/>
                <Picker.Item label="+" value="+"/>
                <Picker.Item label="-" value="-"/>
              </Picker>
            </Item>
          </Form>
          <ListItem button onPress={ () => changeSettings('needDonation', !settingsData.needDonation) }>
            <Switch value={ settingsData.needDonation } onValueChange={ () => changeSettings('needDonation', !settingsData.needDonation) } thumbTintColor="#0a71b2" onTintColor="#579fe4"/>
            <Text>Doresc să fiu anunțat când e nevoie de donatori</Text>
          </ListItem>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 22 }}>
            <Button info onPress={ save } disabled={ !settingsData.updated }>
              <Text>Salvează</Text>
            </Button>
            <Button bordered onPress={ refresh }>
              <Text>Resetează</Text>
            </Button>
          </View>
          <Button transparent full onPress={ doLogout } style={{ marginTop: 50, marginBottom: 15 }}>
            <Text>Logout</Text>
          </Button>
        </KeyboardHandler>
      </Container>
    )
  }
}