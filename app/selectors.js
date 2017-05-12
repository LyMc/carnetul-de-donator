import { createSelector } from 'reselect'

const selectUser = state => state.get('user')

// example
const selectData = state => state.get('data')
export const getUserWithData = createSelector(
  [selectUser, selectData],
  (user, data) => user.filter(k => k === data)
)

export const getUserName = createSelector(
  selectUser,
  user => user.get('name')
)

