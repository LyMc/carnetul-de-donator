import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { registerData } from '../app/selectors'
import Register from '../components/Register'

const mapStateToProps = createStructuredSelector({
  registerData,
})

const mapDispatchToProps = dispatch => ({
  signUp: () => dispatch({type: 'SIGN_UP'}),
  changeRegisterData: (field, value) => dispatch({type: 'CHANGE_REGISTER_DATA', payload: {field, value}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
