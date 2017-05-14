import { createSelector } from 'reselect'

const selectUser = state => state.get('user')
const selectLogin = state => state.get('login')
const selectRegister = state => state.get('register')

/*// example
const selectData = state => state.get('data')
export const getUserWithData = createSelector(
  [selectUser, selectData],
  (user, data) => user.filter(k => k === data)
)*/

export const userData = createSelector(
  selectUser,
  data => ({
    signed: data.get('signed'),
    name: data.get('name'),
    email: data.get('email'),
    uid: data.get('uid'),
  })
)
export const loginData = createSelector(
  selectLogin,
  data => ({
    email: data.get('email'),
    password: data.get('password'),
  })
)
export const registerData = createSelector(
  selectRegister,
  data => ({
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
  })
)

