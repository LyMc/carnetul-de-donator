import {createSelector} from 'reselect'

const selectUser = state => state.get('user')
export const userData = createSelector(selectUser, data => ({
  signed: data.get('signed'),
  name: data.get('name'),
  email: data.get('email'),
  uid: data.get('uid'),
}))
export const isUserSignedIn = createSelector(userData, data => data.signed)

const selectLogin = state => state.get('login')
export const loginData = createSelector(selectLogin, data => ({
  email: data.get('email'),
  password: data.get('password'),
}))

const selectRegister = state => state.get('register')
export const registerData = createSelector(selectRegister, data => ({
  name: data.get('name'),
  email: data.get('email'),
  password: data.get('password'),
}))

const selectHistory = state => state.get('history')
export const historyData = createSelector(selectHistory, data => data.reverse())
export const lastVisit = createSelector(selectHistory, data =>
  data.size > 0
  && data.last()
  && data.last().last()
  && data.last().last().toObject()
  || false
)

const selectNotifications = state => state.get('notifications')
export const notificationsData = createSelector(selectNotifications, data => data)

const selectLocations = state => state.get('locations')
export const locationsData = createSelector(selectLocations, data => data.get('Bucharest') || data)

const selectSettings = state => state.get('settings')
export const settingsData = createSelector(selectSettings, data => data.toObject())
