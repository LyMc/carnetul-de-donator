import { call, put, take, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { loginData, registerData, userData } from '../app/selectors'
import firebaseSaga from '../firebase-saga'

function* doLogin() {
  const login = yield select(loginData)
  try {
    yield call(firebaseSaga.login, login.email, login.password)
  } catch (error) {
    console.log('error login', error)
  }
}
function* doLogout() {
  try {
    yield call(firebaseSaga.logout)
  } catch (error) {
    console.log('error logout', error)
  }
}
function* syncUser() {
  const channel = yield call(firebaseSaga.authChannel)
  while(true) {
    const { error, user } = yield take(channel)
    if (user) {
      yield put({type: 'SIGN_IN', payload: {name: user.displayName, email: user.email, uid: user.uid}})
      yield put({type: 'FETCH_USER_DATA'})
    } else {
      yield put({type: 'SIGN_OUT'})
    }
  }
}
function* signUp() {
  const register = yield select(registerData)
  try {
    const user = yield call(firebaseSaga.register, register.email, register.password, register.name)
    yield put({type: 'SIGN_IN', payload: {name: user.displayName, email: user.email, uid: user.uid}})
  } catch (error) {
    console.log('error sign up', error)
  }
}
function* fetchUserData() {
  const user = yield select(userData)
  try {
    const data = yield call(firebaseSaga.get, '/user/' + user.uid)
    if (data) {
      yield put({type: 'HISTORY/SAVE', payload: data.history || {}})
      yield put({type: 'NOTIFICATIONS/SAVE', payload: data.notifications || {}})
    }
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* fetchAppData() {
  try {
    const data = yield call(firebaseSaga.get, '/app')
    if (data) {
      yield put({type: 'LOCATIONS/SAVE', payload: data.locations || {}})
    }
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* removeData(data) {
  const user = yield select(userData)
  try {
    yield call(firebaseSaga.delete, '/user/' + user.uid + '/' + data.payload.type + '/' + data.payload.key)
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* refresh() {
  yield put({type: 'FETCH_APP_DATA'})
  yield put({type: 'FETCH_USER_DATA'})
}

export default function* rootSaga() {
  yield takeLatest('DO_LOGIN', doLogin)
  yield takeLatest('SYNC_USER', syncUser)
  yield takeLatest('DO_LOGOUT', doLogout)
  yield takeLatest('SIGN_UP', signUp)
  yield takeLatest('FETCH_USER_DATA', fetchUserData)
  yield takeLatest('FETCH_APP_DATA', fetchAppData)
  yield takeLatest('REFRESH', refresh)
  yield takeEvery('REMOVE_DATA', removeData)
  yield put({type: 'SYNC_USER'})
  yield put({type: 'FETCH_APP_DATA'})
}
