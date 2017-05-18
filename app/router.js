import React from 'react'
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation'
import { Icon, View, Text } from 'native-base'
import { Image } from 'react-native'
import LogoSecondaryBig from '../assets/images/logo-secondary-big.jpg'

import LoginScreen from '../containers/LoginScreen'
import RegisterScreen from '../containers/RegisterScreen'
import HomeScreen from '../containers/HomeScreen'
import NotificationsScreen from '../containers/NotificationsScreen'
import ScheduleScreen from '../containers/ScheduleScreen'
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
  Schedule: routerSettings(ScheduleScreen, 'Programează-mă', 'md-calendar'),
  Locations: routerSettings(LocationsScreen, 'Locații', 'md-map'),
  Profile: routerSettings(ProfileScreen, 'Contul meu', 'md-person'),
  History: routerSettings(HistoryScreen, 'Istoric', 'md-list'),
}, {
  initialRouteName: 'Notifications',
  drawerWidth: 320,
  contentComponent: props => <View><Image source={ LogoSecondaryBig } style={{ width: 320, height: 180 }} /><DrawerItems {...props} /></View>,
  contentOptions: {
    activeTintColor: '#0a71b2',
  }
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
