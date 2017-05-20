import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { settingsData, locationsData } from '../app/selectors'
import Schedule from '../components/Schedule'

const mapStateToProps = createStructuredSelector({
  settingsData, locationsData
})

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch({type: 'REFRESH'}),
  changeSettings: (field, value) => dispatch({type: 'SETTINGS/CHANGE', payload: {field, value}}),
  save: (payload) => dispatch({type: 'SAVE_SCHEDULE', payload}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
