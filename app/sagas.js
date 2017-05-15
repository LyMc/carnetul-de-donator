import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { firebaseAuth, firebaseDb } from '../app/firebase'
import { loginData, registerData, userData } from '../app/selectors'

function* doLogin() {
  const login = yield select(loginData)
  try {
    yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], login.email, login.password)
  } catch (error) {
    console.log('error', error)
  }
}
function* doLogout() {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut])
  } catch (error) {
    console.log('error', error)
  }
}
function* signUp() {
  const user = yield select(userData)
  try {
    yield call([firebaseAuth, firebaseAuth.createUserWithEmailAndPassword], register.email, register.password)
    try {
      yield call(firebaseAuth.currentUser.updateProfile, { displayName: register.name })
    } catch (error) {
      console.log('error 2', error)
    }
  } catch (error) {
    console.log('error', error)
  }
}
function* fetchHistory() {
  const register = yield select(registerData)
  try {
    yield call([firebaseDb, firebaseDb.ref('screens/').once], 'value', (snapshot) => console.log(123))
  } catch (error) {
    console.log('error', error)
  }
}

export default function* rootSaga() {
  yield takeLatest('DO_LOGIN', doLogin)
  yield takeLatest('DO_LOGOUT', doLogout)
  yield takeLatest('SIGN_UP', signUp)
  yield takeLatest('FETCH_USER_HISTORY', fetchHistory)
}
