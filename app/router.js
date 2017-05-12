import { StackNavigator } from 'react-navigation'

import HomeScreen from '../containers/HomeScreen'
import AboutScreen from '../containers/AboutScreen'
import LoginScreen from '../containers/LoginScreen'

export default StackNavigator({
  Home: {screen: HomeScreen},
  About: {screen: AboutScreen},
  Login: {screen: LoginScreen},
})
