import React from 'react'
import { DatePickerAndroid } from 'react-native'
import { Container, Content, Button, Text, Form, Input, Item, Label, View } from 'native-base'
import KeyboardHandler from '../app/KeyboardHandler'
import { getMonth } from '../app/utils'
import DiseaseCard from '../components/DiseaseCard'

const showDatePicker = async (showDate, change) => {
  try {
    const date = showDate ? new Date(showDate) : new Date()
    const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'calendar', date })
    if (action !== DatePickerAndroid.dismissedAction) {
      change(new Date(year, month, day, 12, 0).getTime())
    }
  } catch (error) {
    console.warn('Error', error)
  }
}
const renderDate = (date) => {
  if (date) {
    const d = new Date(date)
    return d.getDate() + ' ' + getMonth(d.getMonth()) + ' ' + d.getFullYear()
  }
}
const FormItem = ({label, children, ...props}) => (
  <Item stackedLabel {...props}>
    <Label style={{ paddingLeft: 7, width: '100%' }}>{ label }</Label>
    { children }
  </Item>
)

export default class NewSchedule extends React.Component {
  constructor() {
    super()
    this.state = {
      date: new Date().getTime(),
    }
  }
  onEdit(props) {
    if (props.diseases.has(props.myRouter.key)) {
      const state = props.diseases.get(props.myRouter.key)
      let newState = {}
      newState.key = props.myRouter.key
      if (state.has('date')) newState.date = state.get('date')
      if (state.has('name')) newState.name = state.get('name')
      if (state.has('symptoms')) newState.symptoms = state.get('symptoms')
      if (state.has('drugs')) newState.drugs = state.get('drugs')
      if (state.has('doctorAdvice')) newState.doctorAdvice = state.get('doctorAdvice')
      if (state.has('notes')) newState.notes = state.get('notes')
      if (state.has('dateEnd')) newState.dateEnd = state.get('dateEnd')
      this.setState(newState)
    }
  }
  componentDidMount() {
    this.props.myRouter.type === 'edit' && this.onEdit(this.props)
    this.props.log('Mount', { component: 'Disease' })
  }
  componentWillReceiveProps(nextProps) {
    nextProps.myRouter.type === 'edit' && this.props.myRouter.type !== 'edit' && this.onEdit(nextProps)
  }
  componentWillUnmount() {
    this.props.log('Unmount', { component: 'Disease' })
  }
  render() {
    const { myRouter, diseases, save, remove, open } = this.props
    if (myRouter.screen === 'Diseases' && myRouter.type === 'view') {
      return (
        <Container>
          <Content style={{ padding: 5 }}>
            { diseases.has(myRouter.key) && <DiseaseCard item={ diseases.get(myRouter.key) } edit={() => open(myRouter.key)} remove={() => remove(myRouter.key)} /> }
            <View style={{ height: 50 }}/>
          </Content>
        </Container>
      )
    }
    return (
      <Container>
        <KeyboardHandler ref='kh' offset={ 80 }>
          <Form>
            <FormItem label="Data" button onPress={ () => showDatePicker(this.state.date, (date) => this.setState({ date })) }>
              <Input disabled value={ renderDate(this.state.date) } style={{ paddingLeft: 12 }}/>
            </FormItem>
            <FormItem label="Problema">
              <Input value={ this.state.name } style={{ paddingLeft: 12 }} onChangeText={name => this.setState({ name })} ref="name" onFocus={() => this.refs.kh.inputFocused(this, 'name')}/>
            </FormItem>
            <FormItem label="Simptome">
              <Input multiline value={ this.state.symptoms } style={{ paddingLeft: 12 }} onChangeText={symptoms => this.setState({ symptoms })} ref="symptoms" onFocus={() => this.refs.kh.inputFocused(this, 'symptoms')}/>
            </FormItem>
            <FormItem label="Medicamente">
              <Input multiline value={ this.state.drugs } style={{ paddingLeft: 12 }} onChangeText={drugs => this.setState({ drugs })} ref="drugs" onFocus={() => this.refs.kh.inputFocused(this, 'drugs')}/>
            </FormItem>
            <FormItem label="Sfatul medicului">
              <Input multiline value={ this.state.doctorAdvice } style={{ paddingLeft: 12 }} onChangeText={doctorAdvice => this.setState({ doctorAdvice })} ref="doctorAdvice" onFocus={() => this.refs.kh.inputFocused(this, 'doctorAdvice')}/>
            </FormItem>
            <FormItem label="Notițe">
              <Input multiline value={ this.state.notes } style={{ paddingLeft: 12 }} onChangeText={notes => this.setState({ notes })} ref="notes" onFocus={() => this.refs.kh.inputFocused(this, 'notes')}/>
            </FormItem>
            <FormItem label="Data sfârșit" button onPress={ () => showDatePicker(this.state.dateEnd, dateEnd => this.setState({ dateEnd })) }>
              <Input disabled value={ renderDate(this.state.dateEnd) } style={{ paddingLeft: 12 }}/>
            </FormItem>
          </Form>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 22 }}>
            <Button info onPress={ () => save(this.state) }>
              <Text>Salvează</Text>
            </Button>
          </View>
        </KeyboardHandler>
      </Container>
    )
  }
}
