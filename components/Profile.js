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
  componentDidMount() {
    this.props.log('Mount', { component: 'Profile' })
  }
  componentWillUnmount() {
    this.props.log('Unmount', { component: 'Profile' })
  }
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
            <FormItem label="Sexul" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <FormRadio field="sex" item="M" label="Barbat" value={ profile.sex } change={ change }/>
              <FormRadio field="sex" item="W" label="Femeie" value={ profile.sex } change={ change }/>
            </FormItem>
            <FormItem label="Data nașterii" button onPress={ () => showPicker(profile.birthday, change) }>
              <Input disabled value={ renderBirthday(profile.birthday) } style={{ paddingLeft: 12 }}/>
            </FormItem>
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
