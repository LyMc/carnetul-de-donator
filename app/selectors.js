import { createSelector } from 'reselect'

export const uid = state => state.get('uid')

export const selectUser = state => state.get('user')
export const visits = createSelector(selectUser, user => user.get('visits'))
export const settings = createSelector(selectUser, user => user.get('settings'))
export const profile = createSelector(selectUser, user => user.get('profile').toObject())
export const diseases = createSelector(selectUser, user => user.get('diseases'))
export const userLetters = createSelector(selectUser, user => user.get('letters'))
export const history = createSelector(visits, diseases, (v, d) => v && d && v.merge(d) || v || d)

export const selectApp = state => state.get('app')
export const notificationTypes = createSelector(selectApp, app => app.get('notificationTypes'))
export const locations = createSelector(selectApp, app => app.get('locations'))
export const letters = createSelector(selectApp, app => app.get('letters'))
export const letterCategories = createSelector(selectApp, app => app.get('letterCategories'))
export const cities = createSelector(selectApp, app => app.get('cities'))

export const notifications = state => state.get('notifications')

export const snacks = state => state.get('snacks')
export const lastSnack = createSelector(snacks, s => s.first())
