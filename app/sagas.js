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
    const data = yield call(firebaseSaga.get, '/screens/' + user.uid)
    if (data) {
      if (data.history) {
        const history = Object.entries(data.history).map(([key, val]) => {
          val.key = key
          return val
        })
        yield put({type: 'HISTORY/SAVE', payload: history})
      }
    }
  } catch (error) {
    console.log('error fetch data', error)
  }

}

export default function* rootSaga() {
  yield takeLatest('DO_LOGIN', doLogin)
  yield takeLatest('SYNC_USER', syncUser)
  yield takeLatest('DO_LOGOUT', doLogout)
  yield takeLatest('SIGN_UP', signUp)
  yield takeLatest('FETCH_USER_DATA', fetchUserData)
  yield put({type: 'SYNC_USER'})
}
