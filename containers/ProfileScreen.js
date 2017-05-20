import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userData, settingsData, locationsData } from '../app/selectors'
import Profile from '../components/Profile'

const mapStateToProps = createStructuredSelector({
  userData, settingsData, locationsData
})
const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch({type: 'DO_LOGOUT'}),
  changeName: (payload) => dispatch({type: 'USER/CHANGE_NAME', payload}),
  changeSettings: (field, value) => dispatch({type: 'SETTINGS/CHANGE', payload: {field, value}}),
  refresh: () => dispatch({type: 'REFRESH'}),
  save: () => dispatch({type: 'SAVE_SETTINGS'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
