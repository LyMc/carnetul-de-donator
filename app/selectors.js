import { createSelector } from 'reselect'
import { Map } from 'immutable'

const empty = new Map()

export const uid = state => state.get('uid')

export const selectUser = state => state.get('user') || empty
export const visits = createSelector(selectUser, user => user.get('visits') || empty)
export const settings = createSelector(selectUser, user => user.get('settings') || empty)
export const profile = createSelector(selectUser, user => user.get('profile') && user.get('profile').toObject() || empty)
export const diseases = createSelector(selectUser, user => user.get('diseases') || empty)
export const userLetters = createSelector(selectUser, user => user.get('letters') || empty)
export const history = createSelector(visits, diseases, (v, d) => v && d && v.merge(d) || v || d || empty)

export const selectApp = state => state.get('app') || empty
export const notificationTypes = createSelector(selectApp, app => app.get('notificationTypes') || empty)
export const locations = createSelector(selectApp, app => app.get('locations') || empty)
export const letters = createSelector(selectApp, app => app.get('letters') || empty)
export const letterCategories = createSelector(selectApp, app => app.get('letterCategories') || empty)
export const cities = createSelector(selectApp, app => app.get('cities') || empty)

export const notifications = state => state.get('notifications') || empty

export const snacks = state => state.get('snacks')
export const lastSnack = createSelector(snacks, s => s.first())
