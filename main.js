import Expo from 'expo'
import React from 'react'
import {FontAwesome} from '@expo/vector-icons'
import App from './src/app'

import cacheAssetsAsync from './utilities/cacheAssetsAsync'

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
          FontAwesome.font,
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
      return <App />
    } else {
      return <Expo.AppLoading />
    }
  }
}

Expo.registerRootComponent(AppContainer)
