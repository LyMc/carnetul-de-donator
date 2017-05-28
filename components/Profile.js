import React from 'react'
import { DatePickerAndroid } from 'react-native'
import { Container, Button, Text, Form, Input, Item, ListItem, Label, View, Picker, CheckBox, Switch, Radio } from 'native-base'
import KeyboardHandler from '../app/KeyboardHandler'
import { getMonth } from '../app/utils'
const showPicker = async (birthday, change) => {
  try {
    let date
    if (birthday) {
      const b = birthday.split('-')
      date = new Date(b[0], +b[1] - 1, b[2])
    } else {
      date = new Date()
    }
    const maxDate = new Date()
    const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'spinner', date, maxDate })
    if (action !== DatePickerAndroid.dismissedAction) {
      change('birthday', year + '-' + (month + 1) + '-' + day)
    }
  } catch (error) {
    console.warn('Error', error)
  }
}
const renderBirthday = birthday => {
  if (birthday) {
    const b = birthday.split('-')
    return b[2] + ' ' + getMonth(+b[1] - 1) + ' ' + b[0]
  }
}
const FormItem = ({label, children, ...props}) => (
  <Item stackedLabel {...props}>
    <Label style={{ paddingLeft: 7, width: '100%' }}>{ label }</Label>
    { children }
  </Item>
)
const FormRadio = ({label = false, field, item, value, change}) => (
  <Button transparent dark onPress={() => change(field, item)}><Radio selected={ value === item } onPress={() => change(field, item)}/><Text style={{ paddingHorizontal: 10 }}>{ label || item }</Text></Button>
)
export default class Profile extends React.Component {
  render() {
    const { profile, change, save } = this.props
    return (
      <Container>
        <KeyboardHandler ref='kh' offset={ 80 }>
          <Form>
            <FormItem label="Grup sanguin" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <FormRadio field="blood" item="0" value={ profile.blood } change={ change }/>
              <FormRadio field="blood" item="A" value={ profile.blood } change={ change }/>
              <FormRadio field="blood" item="B" value={ profile.blood } change={ change }/>
              <FormRadio field="blood" item="AB" value={ profile.blood } change={ change }/>
            </FormItem>
            <FormItem label="RH" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <FormRadio field="rh" item="+" value={ profile.rh } change={ change }/>
              <FormRadio field="rh" item="-" value={ profile.rh } change={ change }/>
            </FormItem>
            <FormItem label="Greutate">
              <Input keyboardType="numeric" value={ profile.weight } style={{ paddingLeft: 12 }} onChangeText={(value) => change('weight', value)} ref="weight" onFocus={() => this.refs.kh.inputFocused(this, 'weight')}/>
            </FormItem>
            <FormItem label="Serie buletin">
              <Input value={ profile.idSeries } style={{ paddingLeft: 12 }} onChangeText={(value) => change('idSeries', value)} ref="idSeries" onFocus={() => this.refs.kh.inputFocused(this, 'idSeries')}/>
            </FormItem>
            <FormItem label="Număr buletin">
              <Input value={ profile.idNumber } style={{ paddingLeft: 12 }} onChangeText={(value) => change('idNumber', value)} ref="idNumber" onFocus={() => this.refs.kh.inputFocused(this, 'idNumber')}/>
            </FormItem>
            <FormItem label="CNP">
              <Input keyboardType="numeric" value={ profile.cnp } style={{ paddingLeft: 12 }} onChangeText={(value) => change('cnp', value)} ref="cnp" onFocus={() => this.refs.kh.inputFocused(this, 'cnp')} maxLength={ 13 }/>
            </FormItem>
            <FormItem label="Numele">
              <Input value={ profile.lastName } style={{ paddingLeft: 12 }} onChangeText={(value) => change('lastName', value)} ref="lastName" onFocus={() => this.refs.kh.inputFocused(this, 'lastName')}/>
            </FormItem>
            <FormItem label="Prenumele">
              <Input value={ profile.firstName } style={{ paddingLeft: 12 }} onChangeText={(value) => change('firstName', value)} ref="firstName" onFocus={() => this.refs.kh.inputFocused(this, 'firstName')}/>
            </FormItem>
            <FormItem label="Sexul" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <FormRadio field="sex" item="M" label="Barbat" value={ profile.sex } change={ change }/>
              <FormRadio field="sex" item="W" label="Femeie" value={ profile.sex } change={ change }/>
            </FormItem>
            <FormItem label="Data nașterii" button onPress={ () => showPicker(profile.birthday, change) }>
              <Input disabled value={ renderBirthday(profile.birthday) } style={{ paddingLeft: 12 }}/>
            </FormItem>
            <FormItem label="Județ domiciliu">
              <Input value={ profile.homeCounty } style={{ paddingLeft: 12 }} onChangeText={(value) => change('homeCounty', value)} ref="homeCounty" onFocus={() => this.refs.kh.inputFocused(this, 'homeCounty')}/>
            </FormItem>
            <FormItem label="Localitatea">
              <Input value={ profile.homeCity } style={{ paddingLeft: 12 }} onChangeText={(value) => change('homeCity', value)} ref="homeCity" onFocus={() => this.refs.kh.inputFocused(this, 'homeCity')}/>
            </FormItem>
            <FormItem label="Strada">
              <Input value={ profile.homeStreet } style={{ paddingLeft: 12 }} onChangeText={(value) => change('homeStreet', value)} ref="homeStreet" onFocus={() => this.refs.kh.inputFocused(this, 'homeStreet')}/>
            </FormItem>
            <FormItem label="Număr">
              <Input value={ profile.homeNumber } style={{ paddingLeft: 12 }} onChangeText={(value) => change('homeNumber', value)} ref="homeNumber" onFocus={() => this.refs.kh.inputFocused(this, 'homeNumber')}/>
            </FormItem>
            <FormItem label="Tata">
              <Input value={ profile.father } style={{ paddingLeft: 12 }} onChangeText={(value) => change('father', value)} ref="father" onFocus={() => this.refs.kh.inputFocused(this, 'father')}/>
            </FormItem>
            <FormItem label="Mama">
              <Input value={ profile.mother } style={{ paddingLeft: 12 }} onChangeText={(value) => change('mother', value)} ref="mother" onFocus={() => this.refs.kh.inputFocused(this, 'mother')}/>
            </FormItem>
            <FormItem label="Profesia (ocupația)">
              <Input value={ profile.profession } style={{ paddingLeft: 12 }} onChangeText={(value) => change('profession', value)} ref="profession" onFocus={() => this.refs.kh.inputFocused(this, 'profession')}/>
            </FormItem>
            <FormItem label="Întreprinderea (instituția)">
              <Input value={ profile.workName } style={{ paddingLeft: 12 }} onChangeText={(value) => change('workName', value)} ref="workName" onFocus={() => this.refs.kh.inputFocused(this, 'workName')}/>
            </FormItem>
            <FormItem label="din județul">
              <Input value={ profile.workCounty } style={{ paddingLeft: 12 }} onChangeText={(value) => change('workCounty', value)} ref="workCounty" onFocus={() => this.refs.kh.inputFocused(this, 'workCounty')}/>
            </FormItem>
            <FormItem label="Localitatea">
              <Input value={ profile.workCity } style={{ paddingLeft: 12 }} onChangeText={(value) => change('workCity', value)} ref="workCity" onFocus={() => this.refs.kh.inputFocused(this, 'workCity')}/>
            </FormItem>
            <FormItem label="Strada">
              <Input value={ profile.workStreet } style={{ paddingLeft: 12 }} onChangeText={(value) => change('workStreet', value)} ref="workStreet" onFocus={() => this.refs.kh.inputFocused(this, 'workStreet')}/>
            </FormItem>
            <FormItem label="Număr">
              <Input value={ profile.workNumber } style={{ paddingLeft: 12 }} onChangeText={(value) => change('workNumber', value)} ref="workNumber" onFocus={() => this.refs.kh.inputFocused(this, 'workNumber')}/>
            </FormItem>

            {/*
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
             </Picker>
             </Item>*/}
          </Form>
          {/*<ListItem button onPress={ () => changeSettings('needDonation', !settingsData.needDonation) }>
           <Switch value={ settingsData.needDonation } onValueChange={ () => changeSettings('needDonation', !settingsData.needDonation) } />
           <Text>{ settingsData.needDonation ? 'Doresc' : 'Nu doresc' } să fiu anunțat când e nevoie de donatori</Text>
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
           </Button>*/}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 22 }}>
            <Button info onPress={ save } disabled={ false }>
              <Text>Salvează</Text>
            </Button>
          </View>
        </KeyboardHandler>
      </Container>
    )
  }
}
