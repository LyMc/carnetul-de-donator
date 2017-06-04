import React from 'react'
import { DatePickerAndroid, TimePickerAndroid } from 'react-native'
import { Container, Content, Button, Text, Form, Input, Item, ListItem, Label, View, Picker, CheckBox, Switch, Icon } from 'native-base'
import KeyboardHandler from '../app/KeyboardHandler'
import { getMonth } from '../app/utils'
import VisitCard from '../components/VisitCard'

const week = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă']
const showDatePicker = async (showDate, change) => {
  try {
    let date
    const minDate = new Date().getTime() + 24 * 60 * 60 * 1000
    if (showDate) {
      const b = showDate.split('-')
      date = new Date(b[0], +b[1] - 1, b[2])
    } else {
      date = minDate
    }
    const maxDate = minDate + 3 * 30 * 24 * 60 * 60 * 1000
    const { action, year, month, day } = await DatePickerAndroid.open({ mode: 'calendar', date, minDate, maxDate })
    if (action !== DatePickerAndroid.dismissedAction) {
      change(year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + day).slice(-2))
    }
  } catch (error) {
    console.warn('Error', error)
  }
}
const renderDate = (date) => {
  if (date) {
    const b = date.split('-')
    return b[2] + ' ' + getMonth(+b[1] - 1) + ' ' + b[0]
  }
}
const showTimePicker = async (showTime, change) => {
  try {
    let time = { is24Hour: true }
    if (showTime) {
      const b = showTime.split(':')
      time.hour = +b[0]
      time.minute = +b[1]
    }
    const { action, hour, minute } = await TimePickerAndroid.open(time)
    if (action !== TimePickerAndroid.dismissedAction) {
      change(('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2))
    }
  } catch (error) {
    console.warn('Error', error)
  }
}
const validateTime = (time, hours) => {
  if (!time || !hours) return false
  const hoursObj = hours.split('-')
  if (hoursObj.length < 2) return true
  const from = hoursObj[0].split(':')
  const to = hoursObj[1].split(':')
  const fromH = +from[0]
  const fromM = +from[1]
  const toH = +to[0]
  const toM = +to[1]
  const t = time.split(':')
  const h = +t[0]
  const m = +t[1]
  return !((h > fromH && h < toH) || (h === fromH && m >= fromM) || (h === toH && m <= toM))
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
      date: '',
      time: '',
    }
  }
  componentDidMount() {
    if (this.props.myRouter.type === 'edit') {
      if (this.props.visits.has(this.props.myRouter.key)) {
        const visitDate = new Date(this.props.visits.getIn([ this.props.myRouter.key, 'date' ]))
        this.setState({
          date: visitDate.getFullYear() + '-' + ('0' + (visitDate.getMonth() + 1)).slice(-2) + '-' + ('0' + visitDate.getDate()).slice(-2),
          time: ('0' + visitDate.getUTCHours()).slice(-2) + ':' + ('0' + visitDate.getMinutes()).slice(-2),
        })
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.myRouter.type === 'edit' && this.props.myRouter.type !== 'edit') {
      if (nextProps.visits.has(nextProps.myRouter.key)) {
        const visitDate = new Date(nextProps.visits.getIn([ nextProps.myRouter.key, 'date' ]))
        this.setState({
          date: visitDate.getFullYear() + '-' + ('0' + (visitDate.getMonth() + 1)).slice(-2) + '-' + ('0' + visitDate.getDate()).slice(-2),
          time: ('0' + visitDate.getUTCHours()).slice(-2) + ':' + ('0' + visitDate.getMinutes()).slice(-2),
        })
      }
    }
  }
  render() {
    const { settings, locations, myRouter, visits, change, save, edit, remove } = this.props
    const day = this.state.date ? new Date(this.state.date).getDay() : null
    const hours = this.state.date ? locations.getIn([settings.get('location'), 'hours']).split(';')[day] : null
    if (myRouter.screen === 'Schedule' && myRouter.type === 'view') {
      return (
        <Container>
          <Content style={{ padding: 5 }}>
            { visits.has(myRouter.key) && <VisitCard item={ visits.get(myRouter.key) } locations={ locations } edit={() => edit(myRouter.key)} remove={() => remove(myRouter.key)} /> }
            <View style={{ height: 50 }}/>
          </Content>
        </Container>
      )
    }
    return (
      <Container>
        <KeyboardHandler ref='kh' offset={ 80 }>
          <Form>
            <FormItem label="Locație">
              <Picker
                style={{ width: '100%' }}
                supportedOrientations={[ 'portrait', 'landscape' ]}
                iosHeader="Locație"
                mode="dialog"
                selectedValue={ settings.get('location') }
                onValueChange={ (value) => change('location', value) }
              >
                { locations.map((location, key) => <Picker.Item key={ key } label={location.get('name') + ' ' + location.get('city')} value={ key } />).toArray() }
              </Picker>
            </FormItem>
            <FormItem label="Data" button onPress={ () => showDatePicker(this.state.date, (date) => this.setState({ date })) }>
              <Input disabled value={ renderDate(this.state.date) } style={{ paddingLeft: 12 }}/>
            </FormItem>
            <FormItem label="Ora" button onPress={ () => showTimePicker(this.state.time, (time) => this.setState({ time })) }>
              <Input disabled value={ this.state.time } style={{ paddingLeft: 12 }}/>
            </FormItem>
            { hours && validateTime(this.state.time, hours) && <FormItem style={{ alignItems: 'flex-start' }}>
              <Text style={{ color: '#d32f2f' }}>Program { week[day] }: { hours }</Text>
            </FormItem> }
          </Form>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 22 }}>
            <Button info onPress={ () => save(new Date(this.state.date + 'T' + this.state.time).getTime(), myRouter.screen === 'Schedule' && myRouter.type === 'edit' && myRouter.key || null) } disabled={ !this.state.time || !this.state.date || validateTime(this.state.time, hours) || !settings.get('location') }>
              <Text>Salvează</Text>
            </Button>
          </View>
        </KeyboardHandler>
      </Container>
    )
  }
}
