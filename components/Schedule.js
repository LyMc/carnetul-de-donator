import React from 'react'
import {
  Container, Content, Button, Text, Form, Item, Input, Icon, Picker, Switch, Body, Left, Right, View,
} from 'native-base'
import Header from '../components/Header'

export default ({ navigation, userData, refresh }) => (
  <Container>
    <Header navigation={navigation} title="Programează-mă" refresh={ refresh }/>
    <Content>
      <Form>
        <Item>
          <Picker supportedOrientations={[ 'portrait', 'landscape' ]} headerComponent={
            <Text>Centrul</Text>} mode="dropdown" selectedValue="key0">
            <Item label="Centrul 1" value="key0"/>
            <Item label="C2" value="key1"/>
            <Item label="C3" value="key2"/>
            <Item label="C4" value="key3"/>
          </Picker>
        </Item>
        <Item>
          <Input placeholder="Data"/>
        </Item>
        <Item>
          <Input placeholder="Ora"/>
        </Item>
        <Item>
          <Input placeholder="Detalii"/>
        </Item>
      </Form>
      <View style={{ padding: 15, flexDirection: 'row' }}>
        <Text>Trimite-mi notificare cu o zi înainte</Text>
        <Right><Switch /></Right>
      </View>
      <View style={{ padding: 15, flexDirection: 'row' }}>
        <Right>
          <Button info>
            <Text>Programează-mă</Text>
          </Button>
        </Right>
      </View>
    </Content>
  </Container>
)
