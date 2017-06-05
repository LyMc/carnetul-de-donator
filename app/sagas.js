import { call, put, take, takeLatest, select } from 'redux-saga/effects'
import { ToastAndroid } from 'react-native'
import { Permissions, Notifications, Facebook, Amplitude } from 'expo'
import { uid, selectUser, settings } from '../app/selectors'
import firebaseSaga from '../firebase-saga'

function* showSnack({ payload }) {
  yield call(ToastAndroid.show, payload, ToastAndroid.SHORT)
  yield put({ type: 'LOG_EVENT', payload: { event: 'Snack', props: { message: payload }} })
}
function* logEvent({ payload }) {
  if (payload.props) {
    Amplitude.logEventWithProperties(payload.event, payload.props)
  } else {
    Amplitude.logEvent(payload)
  }
}
function* doLogin({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'Login' }} })
  const { email, password } = payload
  try {
    yield call(firebaseSaga.login, email, password)
    yield put({ type: 'SHOW_SNACK', payload: 'Utilizator autentificat cu succes.'})
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'Login' }} })
  } catch (error) {
    let message = 'Eroare autentificare utilizator.'
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Eroare: E-mail invalid.'
        break
      case 'auth/user-disabled':
        message = 'Eroare: Cont blocat.'
        break
      case 'auth/user-not-found':
        message = 'Eroare: Cont inexistent.'
        break
      case 'auth/wrong-password':
        message = 'Eroare: Parolă greșită.'
        break
    }
    yield put({ type: 'SHOW_SNACK', payload: message })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'Login', error: error.code }} })
  }
}
function* doLogout() {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'Logout' }} })
  const _uid = yield select(uid)
  try {
    yield call(firebaseSaga.delete, '/notifications/' + _uid + '/EXPO_TOKEN')
  } catch(error) {
    console.log('error sagas/doLogout/fb.delete')
  }
  try {
    yield call(firebaseSaga.logout)
    yield put({ type: 'SHOW_SNACK', payload: 'Utilizator deautentificat cu succes.'})
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'Logout' }} })
  } catch (error) {
    yield put({ type: 'SHOW_SNACK', payload: 'Eroare deautentificare utilizator.'})
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'Logout' }} })
  }
}
function* loginWithFacebook() {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'LoginWithFacebook' }} })
  try {
    const { type, token } = yield call(Facebook.logInWithReadPermissionsAsync, '301000843692361', { permissions: [ 'public_profile', 'email' ] })
    if (type === 'success') {
      yield call(firebaseSaga.signInWithCredential, token)
      yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'LoginWithFacebook' }} })
    }
  } catch (error) {
    console.log('error sagas loginWithFacebook')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'LoginWithFacebook' }} })
  }
}
function* syncUser() {
  const channel = yield call(firebaseSaga.authChannel)
  while (true) {
    const { error, user } = yield take(channel)
    if (user) {
      Amplitude.setUserId(user.uid)
      yield put({ type: 'CHANGE_UID', payload: user.uid })
      yield put({ type: 'SHOW_SNACK', payload: 'Utilizator autentificat cu succes.'})
      yield put({ type: 'FETCH_ALL' })

      const { existingStatus } = yield call(Permissions.getAsync, Permissions.REMOTE_NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = yield call(Permissions.askAsync, Permissions.REMOTE_NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus === 'granted') {
        const token = yield call(Notifications.getExponentPushTokenAsync)
        yield call(firebaseSaga.update, '/notifications/' + user.uid + '/EXPO_TOKEN', token)
      }

      const existingUser = yield call(firebaseSaga.get, '/notifications/' + user.uid + '/BASIC')
      if (!existingUser) {
        const providerData = user.providerData[0]
        let userData = {
          location: '-key123',
        }
        if (providerData && providerData.providerId === 'password') {
          userData.email = providerData.email
          userData.name = providerData.displayName
        } else if (providerData && providerData.providerId === 'facebook.com') {
          userData.email = providerData.email
          userData.name = providerData.displayName
          userData.photo = providerData.photoURL
          userData.facebook = providerData.uid
        } else {
          userData.email = user.email
          userData.name = user.displayName
          userData.photo = user.photoURL
        }
        yield call(firebaseSaga.patch, '/users/' + user.uid, {
          settings: userData,
          letters: { "--welcome": new Date().getTime() },
        })
        yield call(firebaseSaga.update, '/notifications/' + user.uid + '/BASIC', true)
        yield put({ type: 'FETCH_ALL' })
        Amplitude.setUserProperties(userData)
      }
    } else {
      yield put({ type: 'CHANGE_UID', payload: false })
      yield put({ type: 'USER/RESET' })
      yield put({ type: 'NOTIFICATIONS/RESET' })
      yield put({ type: 'SHOW_SNACK', payload: 'Pentru a putea folosi aplicația vă rugăm să vă autentificați.'})
    }
    if (error) {
      yield put({ type: 'SHOW_SNACK', payload: 'Eroare autentificare utilizator.'})
    }
  }
}
function* signUp({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'SignUp' }} })
  const { email, password, name } = payload
  try {
    yield call(firebaseSaga.register, email, password, name)
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'SignUp' }} })
  } catch (error) {
    let message = 'Eroare create cont.'
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Eroare: Cont existent.'
        break
      case 'auth/invalid-email':
        message = 'Eroare: E-mail invalid.'
        break
      case 'auth/weak-password':
        message = 'Eroare: Parolă slabă (minim 6 caractere).'
        break
    }
    yield put({ type: 'SHOW_SNACK', payload: message })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'SignUp', error: error.code }} })
  }
}
function* fetchUserData() {
  const _uid = yield select(uid)
  try {
    const user = yield call(firebaseSaga.get, '/users/' + _uid)
    yield user && put({ type: 'USER/SET', payload: user })
  } catch (error) {
    console.log('error sagas fetchUserData')
  }
}
function* fetchAppData() {
  try {
    const app = yield call(firebaseSaga.get, '/app')
    yield app && put({ type: 'APP/SET', payload: app })
  } catch (error) {
    console.log('error sagas fetchAppData')
  }
}
function* fetchNotificationsData() {
  const _uid = yield select(uid)
  try {
    const notifications = yield call(firebaseSaga.get, '/notificatons/' + _uid)
    yield notifications && put({ type: 'NOTIFICATIONS/SET', payload: notifications })
  } catch (error) {
    console.log('error sagas fetchNotificationsData')
  }
}
function* fetchAll() {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'FetchAll' }} })
  yield put({ type: 'FETCH_APP_DATA' })
  yield put({ type: 'FETCH_USER_DATA' })
  yield put({ type: 'FETCH_NOTIFICATIONS_DATA' })
  yield put({ type: 'SHOW_SNACK', payload: 'Date actualizate.'})
  yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'FetchAll' }} })
}
function* saveUserData({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'SaveUserData' }} })
  const _uid = yield select(uid)
  const user = yield select(selectUser)
  try {
    yield call(firebaseSaga.update, '/users/' + _uid + '/' + payload, user.get(payload).toObject())
    yield put({ type: 'SHOW_SNACK', payload: 'Salvat.'})
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'SaveUserData' }} })
  } catch (error) {
    console.log('error sagas saveUserData')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'SaveUserData' }} })
  }
}
function* saveSchedule({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'SaveSchedule' }} })
  yield put({ type: 'SAVE_SETTINGS', payload: 'settings' })
  const _uid = yield select(uid)
  const _settings = yield select(settings)
  try {
    let visitKey = payload.key
    const visit = { location: _settings.get('location'), date: payload.date, status: 'Programare' }
    if (payload.key) {
      yield call(firebaseSaga.update, '/users/' + _uid + '/visits/' + payload.key, visit)
      yield put({ type: 'SHOW_SNACK', payload: 'Programarea a fost modificată.' })
    } else {
      visitKey = yield call(firebaseSaga.create, '/users/' + _uid + '/visits/', visit)
      yield put({ type: 'SHOW_SNACK', payload: 'Programarea a fost înregistrată.' })
    }
    yield put({ type: 'FETCH_USER_DATA' })
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'view', key: visitKey } })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'SaveSchedule' }} })
  } catch (error) {
    console.log('error sagas SaveSchedule')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'SaveSchedule' }} })
  }
}
function* removeVisit({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'RemoveVisit' }} })
  const _uid = yield select(uid)
  try {
    yield call(firebaseSaga.patch, '/users/' + _uid + '/visits/' + payload, { status: 'Anulată'})
    yield put({ type: 'SHOW_SNACK', payload: 'Programarea a fost anulată.' })
    yield put({ type: 'FETCH_USER_DATA' })
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'view', key: payload } })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'RemoveVisit' }} })
  } catch (error) {
    console.log('error sagas removeVisit')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'RemoveVisit' }} })
  }
}
function* editVisit({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'EditVisit' }} })
  try {
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'edit', key: payload } })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'EditVisit' }} })
  } catch (error) {
    console.log('error sagas editVisit')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'EditVisit' }} })
  }
}
function* newVisit() {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'NewVisit' }} })
  try {
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'add', key: '' } })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'NewVisit' }} })
  } catch (error) {
    console.log('error sagas newVisit')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'NewVisit' }} })
  }
}
function* addDisease({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'AddDisease' }} })
  const _uid = yield select(uid)
  try {
    const path = '/users/' + _uid + '/diseases/'
    let key = payload.key
    if (key) {
      delete payload.key
      yield call(firebaseSaga.update, path + key, payload)
      yield put({ type: 'SHOW_SNACK', payload: 'Notița a fost actualizată.' })
    } else {
      key = yield call(firebaseSaga.create, path, payload)
      yield put({ type: 'SHOW_SNACK', payload: 'Notița a fost adăugată în istoricul medical.' })
    }
    yield put({ type: 'FETCH_USER_DATA' })
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Diseases', type: 'view', key } })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'AddDisease' }} })
  } catch (error) {
    console.error('error sagas addDisease')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'AddDisease' }} })
  }
}
function* removeDisease({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'RemoveDisease' }} })
  const _uid = yield select(uid)
  try {
    yield call(firebaseSaga.delete, '/users/' + _uid + '/diseases/' + payload)
    yield put({ type: 'SHOW_SNACK', payload: 'Notița a fost ștearsă din istoricul medical.' })
    yield put({ type: 'FETCH_USER_DATA' })
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Diseases', type: 'add', key: '' } })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'RemoveDisease' }} })
  } catch (error) {
    console.error('error sagas removeDisease')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'RemoveDisease' }} })
  }
}
function* openDisease({ payload }) {
  yield put({ type: 'LOG_EVENT', payload: { event: 'Try', props: { action: 'OpenDisease' }} })
  try {
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Diseases', type: payload ? 'edit' : 'add', key: payload || '' } })
    yield put({ type: 'LOG_EVENT', payload: { event: 'Success', props: { action: 'OpenDisease', type: payload ? 'edit' : 'add' }} })
  } catch (error) {
    console.log('error sagas openDisease')
    yield put({ type: 'LOG_EVENT', payload: { event: 'Error', props: { action: 'OpenDisease', type: payload ? 'edit' : 'add' }} })
  }
}

export default function* rootSaga() {
  yield takeLatest('SHOW_SNACK', showSnack)
  yield takeLatest('LOG_EVENT', logEvent)

  yield takeLatest('SYNC_USER', syncUser)
  yield takeLatest('SIGN_UP', signUp)
  yield takeLatest('DO_LOGIN', doLogin)
  yield takeLatest('DO_LOGOUT', doLogout)
  yield takeLatest('LOGIN_WITH_FACEBOOK', loginWithFacebook)

  yield takeLatest('FETCH_USER_DATA', fetchUserData)
  yield takeLatest('FETCH_APP_DATA', fetchAppData)
  yield takeLatest('FETCH_NOTIFICATIONS_DATA', fetchNotificationsData)
  yield takeLatest('FETCH_ALL', fetchAll)

  yield takeLatest('SAVE_SETTINGS', saveUserData)
  yield takeLatest('SAVE_SCHEDULE', saveSchedule) // ADD_VISIT
  yield takeLatest('REMOVE_VISIT', removeVisit) // REMOVE_VISIT
  yield takeLatest('EDIT_VISIT', editVisit) // OPEN_VISIT
  yield takeLatest('NEW_VISIT', newVisit)

  yield takeLatest('ADD_DISEASE', addDisease)
  yield takeLatest('REMOVE_DISEASE', removeDisease)
  yield takeLatest('OPEN_DISEASE', openDisease)

  yield put({ type: 'SYNC_USER' })
}
