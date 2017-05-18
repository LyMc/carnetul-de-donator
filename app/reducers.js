import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {
    signed: null,
    name: '',
    email: '',
    uid: '',
  },
  login: {
    email: 'victor@locoman.ro',
    password: '123456',
  },
  register: {
    name: 'Victor Locoman',
    email: 'victor@locoman.ro',
    password: '123456',
  },
  history: {},
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return state.set('user', fromJS(action.payload)).setIn(['user', 'signed'], true)
    case 'SIGN_OUT':
      return state.set('user', defaultState.get('user')).setIn(['user', 'signed'], false)
    case 'CHANGE_LOGIN_DATA':
      return state.setIn(['login', action.payload.field], action.payload.value)
    case 'RESET_LOGIN_DATA':
      return state.set('login', defaultState.get('login'))
    case 'CHANGE_REGISTER_DATA':
      return state.setIn(['register', action.payload.field], action.payload.value)
    case 'RESET_REGISTER_DATA':
      return state.set('register', defaultState.get('register'))
    case 'HISTORY/SAVE':
      return state.set('history', fromJS(action.payload))
    case 'HISTORY/ADD':
      return state.updateIn(['history', action.year], history => history.push(action.payload))
    case 'HISTORY/RESET':
      return state.set('history', defaultState.get('history'))
    default:
      return state
  }
}
