import React from 'react'
import { Container, Button, Text, Form, Input, Item, ListItem, Label, View, Picker, CheckBox, Switch, Radio } from 'native-base'
import KeyboardHandler from '../app/KeyboardHandler'
const FormItem = ({label, children, ...props}) => (
  <Item stackedLabel {...props}>
    <Label style={{ paddingLeft: 7, width: '100%' }}>{ label }</Label>
    { children }
  </Item>
)
export default class Settings extends React.Component {
  render() {
    const { settings, change, save } = this.props
    return (
      <Container>
        <KeyboardHandler ref='kh' offset={ 80 }>
          <Form>
            <FormItem label="E-mail">
              <Input keyboardType="email-address" value={ settings.email } style={{ paddingLeft: 12 }} onChangeText={(value) => change('email', value)} ref="email" onFocus={() => this.refs.kh.inputFocused(this, 'email')}/>
            </FormItem>
            <FormItem label="Oraș">
              <Input value={ settings.city } style={{ paddingLeft: 12 }} onChangeText={(value) => change('city', value)} ref="city" onFocus={() => this.refs.kh.inputFocused(this, 'city')}/>
            </FormItem>
            <FormItem label="Locație preferată">
              <Input value={ settings.location } style={{ paddingLeft: 12 }} onChangeText={(value) => change('location', value)} ref="location" onFocus={() => this.refs.kh.inputFocused(this, 'location')}/>
            </FormItem>
            <FormItem label="Facebook">
              <Input value={ settings.facebook } style={{ paddingLeft: 12 }} onChangeText={(value) => change('facebook', value)} ref="facebook" onFocus={() => this.refs.kh.inputFocused(this, 'facebook')}/>
            </FormItem>
            <FormItem label="Google">
              <Input value={ settings.google } style={{ paddingLeft: 12 }} onChangeText={(value) => change('google', value)} ref="google" onFocus={() => this.refs.kh.inputFocused(this, 'google')}/>
            </FormItem>
            <FormItem label="Poză profil">
              <Input value={ settings.photo } style={{ paddingLeft: 12 }} onChangeText={(value) => change('photo', value)} ref="photo" onFocus={() => this.refs.kh.inputFocused(this, 'photo')}/>
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
             </Item>
           */}
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
