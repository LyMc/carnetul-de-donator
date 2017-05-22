import React from 'react'
import { Container, Content, View, Label, Form, Item, Picker } from 'native-base'
import Header from '../components/Header'
import LocationCard from '../components/LocationCard'

export default ({ navigation, locationsData, settingsData, refresh, changeLocation, changeSettings }) => (
  <Container>
    <Header navigation={navigation} title="Locații" refresh={ refresh }/>
    <Content style={{ padding: 5 }}>
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
      </Form>
      { settingsData.city && locationsData.get(settingsData.city).map((item, key) => <LocationCard key={ key } item={ item.toJS() } set={ () => {
        changeLocation(key)
        navigation.navigate('Schedule')
      } } />).toArray() }
      <View style={{ height: 50 }}/>
    </Content>
  </Container>
)
