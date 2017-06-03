import { call, put, take, takeLatest, select } from 'redux-saga/effects'
import { uid, selectUser, settings } from '../app/selectors'
import firebaseSaga from '../firebase-saga'

function* doLogin({ payload }) {
  const { email, password } = payload
  try {
    yield call(firebaseSaga.login, email, password)
    yield put({ type: 'SNACKS/ADD', payload: 'Utilizator autentificat cu succes.'})
  } catch (error) {
    yield put({ type: 'SNACKS/ADD', payload: 'Eroare autentificare utilizator.'})
  }
}
function* doLogout() {
  try {
    yield call(firebaseSaga.logout)
    yield put({ type: 'SNACKS/ADD', payload: 'Utilizator deautentificat cu succes.'})
  } catch (error) {
    yield put({ type: 'SNACKS/ADD', payload: 'Eroare deautentificare utilizator.'})
  }
}
function* syncUser() {
  const channel = yield call(firebaseSaga.authChannel)
  while (true) {
    const { error, user } = yield take(channel)
    if (user) {
      yield put({ type: 'CHANGE_UID', payload: user.uid })
      yield put({ type: 'FETCH_ALL' })
      yield put({ type: 'SNACKS/ADD', payload: 'Utilizator autentificat cu succes.'})
    } else {
      yield put({ type: 'CHANGE_UID', payload: false })
      yield put({ type: 'SNACKS/ADD', payload: 'Pentru a putea folosi aplicația vă rugăm să vă autentificați.'})
    }
    if (error) {
      yield put({ type: 'SNACKS/ADD', payload: 'Eroare autentificare utilizator.'})
    }
  }
}
function* signUp({ payload }) {
  const { email, password, name } = payload
  try {
    const user = yield call(firebaseSaga.register, email, password, name)
    yield call(firebaseSaga.update, '/users/' + user.uid, {
      settings: { name: user.displayName, email: user.email, photo: user.photoURL, location: '-key123' },
      letters: { welcome: new Date().getTime() },
    })
    yield call(firebaseSaga.update, '/notifications/' + user.uid + '/BASIC', true)
    yield put({ type: 'FETCH_ALL' })
  } catch (error) {
    console.log('error sign up', error)
  }
}
function* fetchUserData() {
  const _uid = yield select(uid)
  try {
    const user = yield call(firebaseSaga.get, '/users/' + _uid)
    yield user && put({ type: 'USER/SET', payload: user })
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* fetchAppData() {
  try {
    const app = yield call(firebaseSaga.get, '/app')
    yield app && put({ type: 'APP/SET', payload: app })
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* fetchNotificationsData() {
  const _uid = yield select(uid)
  try {
    const notifications = yield call(firebaseSaga.get, '/notificatons/' + _uid)
    yield notifications && put({ type: 'NOTIFICATIONS/SET', payload: notifications })
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* fetchAll() {
  yield put({ type: 'FETCH_APP_DATA' })
  yield put({ type: 'FETCH_USER_DATA' })
  yield put({ type: 'FETCH_NOTIFICATIONS_DATA' })
  yield put({ type: 'SNACKS/ADD', payload: 'Date actualizate.'})
}
function* saveUserData({ payload }) {
  const _uid = yield select(uid)
  const user = yield select(selectUser)
  try {
    yield call(firebaseSaga.update, '/users/' + _uid + '/' + payload, user.get(payload).toObject())
    yield put({ type: 'SNACKS/ADD', payload: 'Salvat.'})
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* saveSchedule({ payload }) {
  yield put({ type: 'SAVE_SETTINGS', payload: 'settings' })
  const _uid = yield select(uid)
  const _settings = yield select(settings)
  try {
    let visitKey = payload.key
    const visit = { location: _settings.get('location'), date: payload.date, status: 'Programare' }
    if (payload.key) {
      yield call(firebaseSaga.update, '/users/' + _uid + '/visits/' + payload.key, visit)
      yield put({ type: 'SNACKS/ADD', payload: 'Programarea a fost modificată.' })
    } else {
      visitKey = yield call(firebaseSaga.create, '/users/' + _uid + '/visits/', visit)
      yield put({ type: 'SNACKS/ADD', payload: 'Programarea a fost înregistrată.' })
    }
    yield put({ type: 'FETCH_USER_DATA' })
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'view', key: visitKey } })
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* removeVisit({ payload }) {
  const _uid = yield select(uid)
  try {
    yield call(firebaseSaga.patch, '/users/' + _uid + '/visits/' + payload, { status: 'Anulată'})
    yield put({ type: 'SNACKS/ADD', payload: 'Programarea a fost anulată.' })
    yield put({ type: 'FETCH_USER_DATA' })
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'view', key: payload } })
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* editVisit({ payload }) {
  try {
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'edit', key: payload } })
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* newVisit() {
  try {
    yield put({ type: 'ROUTER/CHANGE', payload: { screen: 'Schedule', type: 'add', key: '' } })
  } catch (error) {
    console.log('error fetch data', error)
  }
}

export default function* rootSaga() {
  yield takeLatest('SYNC_USER', syncUser)
  yield takeLatest('SIGN_UP', signUp)
  yield takeLatest('DO_LOGIN', doLogin)
  yield takeLatest('DO_LOGOUT', doLogout)
  yield takeLatest('FETCH_USER_DATA', fetchUserData)
  yield takeLatest('FETCH_APP_DATA', fetchAppData)
  yield takeLatest('FETCH_NOTIFICATIONS_DATA', fetchNotificationsData)
  yield takeLatest('FETCH_ALL', fetchAll)
  yield takeLatest('SAVE_SETTINGS', saveUserData)
  yield takeLatest('SAVE_SCHEDULE', saveSchedule)
  yield takeLatest('REMOVE_VISIT', removeVisit)
  yield takeLatest('EDIT_VISIT', editVisit)
  yield takeLatest('NEW_VISIT', newVisit)
  yield put({ type: 'SYNC_USER' })
}
