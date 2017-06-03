import { fromJS } from 'immutable'
const now = new Date().getTime()

const defaultState = fromJS({
  uid: null,
  user: {},
  userDefaults: {
    settings: {
      email: '',
      facebook: false,
      google: false,
      photo: '',
      city: 'cityName',
      location: 'locationKey',
    },
    profile: {
      blood: '', // 0, a, b, ab
      rh: '', // +, -
      weight: '',
      idSeries: '',
      idNumber: '',
      cnp: '',
      lastName: '',
      firstName: '',
      sex: '', // m, w
      birthday: '1999-12-31',
      homeCounty: '',
      homeCity: '',
      homeStreet: '',
      homeNumber: '',
      father: '',
      mother: '',
      profession: '',
      workName: '',
      workCounty: '',
      workCity: '',
      workStreet: '',
      workNumber: '',
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
        temp: '',
        drugs: '',
        doctorAdvice: '',
        notes: '',
        date: now,
        dateEnd: now,
        status: 'active', // done
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
      secondLocationKey: {
        name: 'Locație 2',
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
    notificationTypeKey: true,
  },
  snacks: [],
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
    case 'APP/SET':
      return state.set('app', fromJS(action.payload))
    case 'NOTIFICATIONS/SET':
      return state.set('notifications', fromJS(action.payload))
    case 'SNACKS/ADD':
      return state.update('snacks', snacks => snacks.push(action.payload))
    case 'SNACKS/REMOVE':
      return state.updateIn(['snacks'], snacks => snacks.shift())
    case 'USER/CHANGE':
      return state.setIn(['user', action.payload.section, action.payload.field], action.payload.value)
    case 'ROUTER/CHANGE':
      return state.set('router', fromJS(action.payload))

    case 'HISTORY/ADD':
      return state.updateIn(['history', action.year], history => history.push(action.payload))
    case 'NOTIFICATIONS/REMOVE':
      return state.deleteIn(['notifications', action.payload])
    default:
      return state
  }
}
