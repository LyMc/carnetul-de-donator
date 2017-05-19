import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userData, lastVisit, notificationsData } from '../app/selectors'
import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({
  userData, lastVisit, notificationsData
})

const mapDispatchToProps = dispatch => ({
  removeNotification: (payload) => {
    dispatch({ type: 'NOTIFICATIONS/REMOVE', payload })
    dispatch({ type: 'REMOVE_DATA', payload: { type: 'notifications', key: payload } })
  },
  refresh: () => dispatch({type: 'REFRESH'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
