import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { notificationsData } from '../app/selectors'
import Notifications from '../components/Notifications'

const mapStateToProps = createStructuredSelector({
  notificationsData,
})

const mapDispatchToProps = dispatch => ({
  remove: (payload) => {
    dispatch({ type: 'NOTIFICATIONS/REMOVE', payload })
    dispatch({ type: 'REMOVE_DATA', payload: { type: 'notifications', key: payload } })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
