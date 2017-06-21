import React from 'react'
import { TabNavigator, DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation'
import { Icon, View, Text, List, ListItem } from 'native-base'
import RefreshButton from '../containers/RefreshButton'
import MenuButton from '../containers/MenuButton'
import LogoutButton from '../containers/LogoutButton'
import Menu from '../components/Menu'

import LoginScreen from '../containers/LoginScreen'
import RegisterScreen from '../containers/RegisterScreen'
import HomeScreen from '../containers/HomeScreen'
import HistoryScreen from '../containers/HistoryScreen'
import LettersScreen from '../containers/LettersScreen'
import ProfileScreen from '../containers/ProfileScreen'
import SettingsScreen from '../containers/SettingsScreen'
import AboutScreen from '../containers/AboutScreen'
import NewScheduleScreen from '../containers/NewScheduleScreen'
import LetterScreen from '../containers/LetterScreen'
import DiseaseScreen from '../containers/DiseaseScreen'

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
  initialRouteName: 'Home',
  tabBarOptions: {
    showIcon: true, showLabel: false, style: {
      backgroundColor: '#ff6659',
    }, indicatorStyle: {
      backgroundColor: '#0a71b2',
    },
    inactiveTintColor: '#fff',
  },
})
const stackSettings = (screen, title, showMenu = false) => ({
  screen,
  navigationOptions: ({ navigation }) => ({
    title: title || navigation.state.params.title,
    headerStyle: { backgroundColor: '#d32f2f' },
    headerTitleStyle: { color: '#fff' },
    headerLeft: <MenuButton navigation={ navigation } showMenu={ showMenu }/>,
    headerRight: <RefreshButton/>,
  })
})
const StackRouter = StackNavigator({
  Tabs: stackSettings(TabRouter, 'Acasă', true),
  Profile: stackSettings(ProfileScreen, 'Contul meu'),
  Settings: stackSettings(SettingsScreen, 'Setări'),
  About: stackSettings(AboutScreen, 'Despre proiect'),
  NewSchedule: stackSettings(NewScheduleScreen, 'Programează-mă'),
  Letter: stackSettings(LetterScreen, false),
  Disease: stackSettings(DiseaseScreen, 'Istoric medical'),
}, {
  initialRouteName: 'Tabs',
})

drawerItems = [
  {label: 'Contul meu', route: 'Profile'},
  {label: 'Setări', route: 'Settings'},
  {label: 'Despre proiect', route: 'About'},
]

export const MainRouter = DrawerNavigator({
  Stack: { screen: StackRouter },
}, {
  initialRouteName: 'Stack',
  drawerWidth: 320,
  contentOptions: {
    activeTintColor: '#0a71b2',
  },
  contentComponent: props => (
    <View style={{ flex: 1, position: 'relative', paddingBottom: 50 }}>
      <Menu/>
      <List style={{ width: '100%' }}>
        { drawerItems.map(item => (
          <ListItem key={ item.route } onPress={() => props.navigation.navigate(item.route)}
          >
            <Text>{item.label}</Text>
          </ListItem>
        )) }
      </List>
      <LogoutButton/>
    </View>
  ),
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
