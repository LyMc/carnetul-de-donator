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
  componentDidMount() {
    this.props.log('Mount', { component: 'Settings' })
  }
  componentWillUnmount() {
    this.props.log('Unmount', { component: 'Settings' })
  }
  render() {
    const { settings, change, save } = this.props
    return (
      <Container>
        <KeyboardHandler ref='kh' offset={ 80 }>
          <Form>
            <FormItem label="E-mail">
              <Input disabled keyboardType="email-address" value={ settings.get('email') } style={{ paddingLeft: 12 }} onChangeText={(value) => change('email', value)} ref="email" onFocus={() => this.refs.kh.inputFocused(this, 'email')}/>
            </FormItem>
            <FormItem label="Nume">
              <Input value={ settings.get('name') } style={{ paddingLeft: 12 }} onChangeText={(value) => change('name', value)} ref="name" onFocus={() => this.refs.kh.inputFocused(this, 'name')}/>
            </FormItem>
            <FormItem label="Oraș">
              <Input value={ settings.get('city') } style={{ paddingLeft: 12 }} onChangeText={(value) => change('city', value)} ref="city" onFocus={() => this.refs.kh.inputFocused(this, 'city')}/>
            </FormItem>
            { settings.get('facebook') && <FormItem label="Facebook">
              <Input disabled value={ settings.get('facebook') } style={{ paddingLeft: 12 }} onChangeText={(value) => change('facebook', value)} ref="facebook" onFocus={() => this.refs.kh.inputFocused(this, 'facebook')}/>
            </FormItem> }
            {/*<FormItem label="Poză profil">*/}
              {/*<Input disabled value={ settings.get('photo') } style={{ paddingLeft: 12 }} onChangeText={(value) => change('photo', value)} ref="photo" onFocus={() => this.refs.kh.inputFocused(this, 'photo')}/>*/}
            {/*</FormItem>*/}
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
