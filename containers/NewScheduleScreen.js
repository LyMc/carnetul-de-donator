import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { locations, settings, myRouter, visits } from '../app/selectors'
import NewSchedule from '../components/NewSchedule'

const mapStateToProps = createStructuredSelector({ locations, settings, myRouter, visits })
const mapDispatchToProps = dispatch => ({
  change: (field, value) => dispatch({ type: 'USER/CHANGE', payload: { section: 'settings', field, value }}),
  save: (date, key = null) => dispatch({ type: 'SAVE_SCHEDULE', payload: { date, key } }),
  edit: (payload) => dispatch({ type: 'EDIT_VISIT', payload }),
  remove: (payload) => dispatch({ type: 'REMOVE_VISIT', payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewSchedule)
