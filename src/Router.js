import { createRouter } from '@expo/ex-navigation'

import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'

export default createRouter(() => ({
  home: () => HomeScreen,
  about: () => AboutScreen,
}))
