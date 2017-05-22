import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { locationsData, settingsData } from '../app/selectors'
import Locations from '../components/Locations'

const mapStateToProps = createStructuredSelector({
  locationsData, settingsData
})

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch({type: 'REFRESH'}),
  changeLocation: (value) => dispatch({type: 'SETTINGS/CHANGE', payload: {field: 'location', value}}),
  changeSettings: (field, value) => dispatch({type: 'SETTINGS/CHANGE', payload: {field, value}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
