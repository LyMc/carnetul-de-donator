import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* fetchUsers() {

}

export default function* rootSaga() {
  yield takeEvery('FETCH_USERS', fetchUsers)
}
