import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { historyData, locationsData } from '../app/selectors'

import History from '../components/History'

const mapStateToProps = createStructuredSelector({
  historyData, locationsData
})

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch({type: 'REFRESH'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
