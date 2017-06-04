import React from 'react'
import { Text, Card, CardItem, Body, View, Button } from 'native-base'
import { getMonth } from '../app/utils'
const renderDate = (date) => {
  const d = new Date(date)
  return d.getDate() + ' ' + getMonth(d.getMonth())
}

export default ({ item, edit, remove }) => (
  <Card>
    <CardItem>
      <Body>
        <Text>{ item.get('name') }</Text>
        <Text note>{ item.has('dateEnd') && item.get('dateEnd') > new Date().getTime() || !item.get('dateEnd') ? 'Actuală' : 'Lecuită' }</Text>
      </Body>
    </CardItem>
    <CardItem style={{ flexWrap: 'wrap', flexDirection: 'column', alignItems: 'flex-start' }}>
      { item.has('dateEnd') || <Text note>Data</Text> }
      { item.has('dateEnd') || <Text style={{ paddingLeft: 15 }}>{ renderDate(item.get('date')) }</Text> }
      { item.has('dateEnd') && <Text note>Perioada</Text> }
      { item.has('dateEnd') && <Text style={{ paddingLeft: 15 }}>{ renderDate(item.get('date')) } - { renderDate(item.get('dateEnd')) }</Text> }
      { item.has('symptoms') && <Text note>Simptome</Text> }
      { item.has('symptoms') && <Text style={{ paddingLeft: 15 }}>{ item.get('symptoms') }</Text> }
      { item.has('drugs') && <Text note>Medicamente</Text> }
      { item.has('drugs') && <Text style={{ paddingLeft: 15 }}>{ item.get('drugs') }</Text> }
      { item.has('doctorAdvice') && <Text note>Sfatul medicului</Text> }
      { item.has('doctorAdvice') && <Text style={{ paddingLeft: 15 }}>{ item.get('doctorAdvice') }</Text> }
      { item.has('notes') && <Text note>Notițe</Text> }
      { item.has('notes') && <Text style={{ paddingLeft: 15 }}>{ item.get('notes') }</Text> }
    </CardItem>
    { (edit || remove) && <CardItem>
      { edit && <Button info onPress={ edit } style={{ marginRight: 15 }}>
        <Text>Editează</Text>
      </Button> }
      { remove && <Button info bordered onPress={ remove }>
        <Text>Șterge</Text>
      </Button> }
    </CardItem> }
  </Card>
)
