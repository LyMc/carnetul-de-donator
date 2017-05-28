import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Register from '../components/Register'

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = dispatch => ({
  signUp: (email, password, name) => dispatch({ type: 'SIGN_UP', payload: { email, password, name } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
