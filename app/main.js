import Expo from 'expo'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { Ionicons } from '@expo/vector-icons'
import cacheAssetsAsync from './cacheAssetsAsync'
import { Platform, StatusBar, View } from 'react-native'
import getTheme from '../native-base-theme/components'
import { StyleProvider } from 'native-base'

import Sentry from 'sentry-expo'
Sentry.config('https://6c24fe0ca41249cbb7c5e2cd19ea4f9e@sentry.io/170088').install()

import App from '../containers/App'
import reducer from './reducers'
import saga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(saga)

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync()
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
      return <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: '#eee' }}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={{ height: 24, backgroundColor: '#d32f2f' }} />}
          <StyleProvider style={getTheme()}>
            <App />
          </StyleProvider>
        </View>
      </Provider>
    } else {
      return <Expo.AppLoading />
    }
  }
}

Expo.registerRootComponent(AppContainer)
