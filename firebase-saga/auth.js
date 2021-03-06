import { eventChannel } from 'redux-saga'
import { call } from 'redux-saga/effects'
import * as firebase from 'firebase'

function * login (email, password) {
  const auth = this.app.auth()
  const credential = yield call([auth, auth.signInWithEmailAndPassword], email, password)

  return credential
}

function * login (email, password) {
  const auth = this.app.auth()
  const credential = yield call([auth, auth.signInWithEmailAndPassword], email, password)

  return credential
}
function * signInWithCredential(token) {
  const auth = this.app.auth()
  const credential = firebase.auth.FacebookAuthProvider.credential(token)
  yield call([auth, auth.signInWithCredential], credential)
}
function * logout () {
  const auth = this.app.auth()
  yield call([auth, auth.signOut])
}

function authChannel () {
  if (this._authChannel) return this._authChannel

  const auth = this.app.auth()
  const channel = eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    )

    return unsubscribe
  })

  this._authChannel = channel
  return channel
}
function * register (email, password, name) {
  const auth = this.app.auth()
  const currentUser = yield call([auth, auth.createUserWithEmailAndPassword], email, password)
  yield call([currentUser, currentUser.updateProfile], {displayName: name, photoURL: ''})
  return auth.currentUser
}

export default {
  authChannel,
  login,
  signInWithCredential,
  logout,
  register,
}
