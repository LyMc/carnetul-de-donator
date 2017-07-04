import { fromJS } from 'immutable'
const now = new Date().getTime()

const defaultState = fromJS({
  uid: null,
  user: {},
  userDefaults: {
    settings: {
      email: '',
      facebook: false,
      photo: '',
      city: 'cityName',
      location: 'locationKey',
    },
    profile: {
      blood: '', // 0, a, b, ab
      rh: '', // +, -
      weight: '',
      sex: '', // m, w
      birthday: '1999-12-31',
    },
    visits: {
      visitKey: {
        date: now,
        location: 'locationKey',
        status: 'active', // done, cancelled
      },
    },
    diseases: {
      diseaseKey: {
        name: '',
        symptoms: '',
        drugs: '',
        doctorAdvice: '',
        notes: '',
        date: now,
        dateEnd: now,
      },
    },
    letters: {
      letterKey: now,
    },
  },
  app: {
    notificationTypes: {
      notificationTypeKey: {
        title: true,
        content: true,
        schedule: true,
        cantDismiss: true,
      },
    },
    locations: {
      locationKey: {
        name: '',
        city: 'cityName',
        address: '',
        addressLink: '',
        hours: ['m', 't', 'w', 't', 'f', 's', 's'],
        phone: '',
        website: '',
        latitude: 0,
        longitude: 0,
      },
    },
    letters: {
      letterKey: {
        title: '',
        content: '',
      },
    },
    cities: {
      cityName: {
        locationKey: true,
      },
    },
  },
  notifications: {
    BASIC: true,
  },
  router: {
    screen: '',
    type: '',
    key: '',
  },
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_UID':
      return state.set('uid', action.payload)
    case 'USER/SET':
      return state.set('user', fromJS(action.payload))
    case 'USER/RESET':
      return state.set('user', defaultState.get('user'))
    case 'APP/SET':
      return state.set('app', fromJS(action.payload))
    case 'NOTIFICATIONS/SET':
      return state.set('notifications', fromJS(action.payload))
    case 'NOTIFICATIONS/RESET':
      return state.set('notifications', defaultState.get('notifications'))
    case 'USER/CHANGE':
      return state.setIn(['user', action.payload.section, action.payload.field], action.payload.value)
    case 'ROUTER/CHANGE':
      return state.set('router', fromJS(action.payload))
    default:
      return state
  }
}
