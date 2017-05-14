import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userData } from '../app/selectors'
import Profile from '../components/Profile'

const mapStateToProps = createStructuredSelector({
  userData,
})
const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch({type: 'DO_LOGOUT'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
