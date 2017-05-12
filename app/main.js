import Expo from 'expo'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'
import cacheAssetsAsync from './cacheAssetsAsync'

import App from '../containers/App'
import reducer from './reducers'
import saga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(saga)

const firebaseConfig = {
  apiKey: "AIzaSyBjz0G96H--tZFTFvfhgdgq3Y4soA5wtQ0",
  authDomain: "carnetul-de-donator.firebaseapp.com",
  databaseURL: "https://carnetul-de-donator.firebaseio.com",
  projectId: "carnetul-de-donator",
  storageBucket: "carnetul-de-donator.appspot.com",
  messagingSenderId: "694971768256"
}

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync()
    firebase.initializeApp(firebaseConfig)
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [],
        fonts: [
          // Ionicons.font,
          {'Roboto': require('native-base/Fonts/Roboto.ttf')},
          {'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')},
        ],
      })
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.',
      )
      console.log(e.message)
    } finally {
      this.setState({appIsReady: true})
    }
  }

  render() {
    if (this.state.appIsReady) {
      return <Provider store={store}><App /></Provider>
    } else {
      return <Expo.AppLoading />
    }
  }
}

Expo.registerRootComponent(AppContainer)
