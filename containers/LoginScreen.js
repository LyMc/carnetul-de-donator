import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Login from '../components/Login'

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => dispatch({ type: 'DO_LOGIN', payload: { email, password } }),
  loginWithFacebook: () => dispatch({ type: 'LOGIN_WITH_FACEBOOK' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
