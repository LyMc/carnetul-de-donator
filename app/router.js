import React from 'react'
import { TabNavigator, DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation'
import { Image } from 'react-native'
import { Icon, View, Text, List, ListItem } from 'native-base'
import LogoSecondaryBig from '../assets/images/logo-secondary-big.jpg'
import RefreshButton from '../containers/RefreshButton'
import MenuButton from '../containers/MenuButton'

import LoginScreen from '../containers/LoginScreen'
import RegisterScreen from '../containers/RegisterScreen'
import HomeScreen from '../containers/HomeScreen'
import HistoryScreen from '../containers/HistoryScreen'
import LettersScreen from '../containers/LettersScreen'
import ProfileScreen from '../containers/ProfileScreen'
//import NotificationsScreen from '../containers/NotificationsScreen'
//import ScheduleScreen from '../containers/ScheduleScreen'
//import LocationsScreen from '../containers/LocationsScreen'

const navigationOptions = (label, iconName) => ({
  drawerLabel: label, drawerIcon: ({ tintColor }) => <Icon name={ iconName } style={{ color: tintColor }}/>,
})
const routerSettings = (screen, label, iconName) => ({
  screen, navigationOptions: navigationOptions(label, iconName),
})

/*export const OldRouter = DrawerNavigator({
 Notifications: routerSettings(NotificationsScreen, 'Notificări', 'md-notifications'),
 Schedule: routerSettings(ScheduleScreen, 'Programează-mă', 'md-calendar'),
 Locations: routerSettings(LocationsScreen, 'Locații', 'md-map'),
 Profile: routerSettings(ProfileScreen, 'Contul meu', 'md-person'),
 })*/

const tabSettings = (screen, icon) => ({
  screen, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon name={ icon } style={{ color: tintColor }}/>,
  },
})

const TabRouter = TabNavigator({
  Home: tabSettings(HomeScreen, 'md-home'),
  History: tabSettings(HistoryScreen, 'md-list'),
  Letters: tabSettings(LettersScreen, 'md-mail'),
}, {
  tabBarOptions: {
    showIcon: true, showLabel: false, style: {
      backgroundColor: '#ff6659',
    }, indicatorStyle: {
      backgroundColor: '#0a71b2',
    },
  },
})
const stackSettings = (screen, title, showMenu = false) => ({
  screen,
  navigationOptions: ({ navigation }) => ({
    title,
    headerStyle: { backgroundColor: '#d32f2f' },
    headerTitleStyle: { color: '#fff' },
    headerLeft: <MenuButton navigation={ navigation } showMenu={ showMenu }/>,
    headerRight: <RefreshButton/>,
  })
})
const StackRouter = StackNavigator({
  Tabs: stackSettings(TabRouter, 'Acasă', true),
  Profile: stackSettings(ProfileScreen, 'Contul meu'),
}, {
  initialRouteName: 'Tabs',
})

drawerItems = [
  {label: 'Contul meu', route: 'Profile'},
  {label: 'Setări', route: 'Settings'},
]

export const MainRouter = DrawerNavigator({
  Stack: { screen: StackRouter },
}, {
  initialRouteName: 'Stack',
  drawerWidth: 320,
  contentOptions: {
    activeTintColor: '#0a71b2',
  },
  contentComponent: props => <View>
    <Image source={ LogoSecondaryBig } style={{ width: 320, height: 180 }}/>
    <List>
      { drawerItems.map(item => (
        <ListItem key={ item.route } onPress={() => props.navigation.navigate(item.route)}
        >
          <Text>{item.label}</Text>
        </ListItem>
      )) }
    </List>
  </View>,
})

export const AuthRouter = StackNavigator({
  Login: {
    screen: LoginScreen, navigationOptions: {
      title: 'Login', header: null,
    },
  }, Register: {
    screen: RegisterScreen, navigationOptions: {
      title: 'Creează cont',
    },
  },
}, {
  initialRouteName: 'Login',
})
