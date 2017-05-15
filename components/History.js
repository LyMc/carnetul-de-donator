import React from 'react'
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Left,
  View,
} from 'native-base'
import Header from '../components/Header'
import appLogo from '../assets/icons/app.png'

const data = [
  {
    key: 1,
    day: 22,
    month: 'apr',
    title: 'Donație 450ml',
    description: 'Centrul de transfuzie sanguină București',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur commodi, dolore dolorum ducimus eius eos illo impedit labore officiis porro provident quia quibusdam repellat sequi veniam voluptas, voluptate voluptates.',
  }, {
    key: 2,
    day: 15,
    month: 'mar',
    title: 'Donație 450ml',
    description: 'Centrul de transfuzie sanguină București',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur commodi, dolore dolorum ducimus eius eos illo impedit labore officiis porro provident quia quibusdam repellat sequi veniam voluptas, voluptate voluptates.',
  }, {
    key: 3,
    day: 1,
    month: 'dec',
    title: 'Donație 450ml',
    description: 'Centrul de transfuzie sanguină București',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati sint tenetur voluptatem! Accusamus aliquid amet commodi, doloribus laboriosam modi, nulla quas quod reprehenderit sapiente soluta, tempora tenetur vitae voluptate?',
  }, {
    key: 4,
    day: 30,
    month: 'feb',
    title: 'Donație 450ml',
    description: 'Centrul de transfuzie sanguină București',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet at aut autem consectetur, deserunt, error facere illo natus necessitatibus nihil nulla praesentium. Commodi cum, eveniet magnam mollitia nobis rem tempora.',
  },
]

export default ({
  navigation,
  userData,
  fetchUserHistory,
}) => (
  <Container>
    <Header navigation={navigation} title="Istoric" />
    <Content style={{ padding: 5 }}>
      { data && data.map(item => (
        <Card key={ item.key }>
          <CardItem>
            <Left>
              <Thumbnail square size={ 70 } source={ appLogo } />
              <View style={{
                position: 'absolute',
                left: 13,
                top: 5,
                width: 30,
                height: 45,
              }}>
                <Text style={{
                  fontSize: 20,
                  color: '#fff',
                  textAlign: 'center',
                }}>{ item.day }</Text>
                <Text style={{
                  fontSize: 12,
                  color: '#fff',
                  textAlign: 'center',
                }}>{ item.month }</Text>
              </View>
              <Body>
              <Text>{ item.title }</Text>
              <Text note>{ item.description }</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Text>{ item.content }</Text>
          </CardItem>
        </Card>
      ))}
      <View style={{ height: 50 }} />
    </Content>
  </Container>
)
