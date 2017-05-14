import React from 'react'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { Icon } from 'native-base'

import LoginScreen from '../containers/LoginScreen'
import RegisterScreen from '../containers/RegisterScreen'
import HomeScreen from '../containers/HomeScreen'
import NotificationsScreen from '../containers/NotificationsScreen'
import SheduleScreen from '../containers/SheduleScreen'
import LocationsScreen from '../containers/LocationsScreen'
import ProfileScreen from '../containers/ProfileScreen'
import HistoryScreen from '../containers/HistoryScreen'

const navigationOptions = (label, iconName) => ({
  drawerLabel: label,
  drawerIcon: ({ tintColor }) => <Icon name={ iconName } style={{color: tintColor}} />,
})
const routerSettings = (screen, label, iconName) => ({
  screen,
  navigationOptions: navigationOptions(label, iconName)
})

export const MainRouter = DrawerNavigator({
  Home: routerSettings(HomeScreen, 'Acasă', 'md-home'),
  Notifications: routerSettings(NotificationsScreen, 'Notificări', 'md-notifications'),
  Shedule: routerSettings(SheduleScreen, 'Programează-mă', 'md-calendar'),
  Locations: routerSettings(LocationsScreen, 'Locații', 'md-map'),
  Profile: routerSettings(ProfileScreen, 'Contul meu', 'md-person'),
  History: routerSettings(HistoryScreen, 'Istoric', 'md-list'),
}, {
  initialRouteName: 'Home',
})

export const AuthRouter = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
      header: null,
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Creează cont',
    }
  },
}, {
  initialRouteName: 'Login',
})
