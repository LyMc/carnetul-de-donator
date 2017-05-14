import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {
    signed: null,
    name: '',
    email: '',
    uid: '',
  },
  login: {
    email: '',
    password: '',
  },
  register: {
    name: '',
    email: '',
    password: '',
  },
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
    default:
      return state
  }
}
