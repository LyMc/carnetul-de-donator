import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { historyData } from '../app/selectors'

import History from '../components/History'

const mapStateToProps = createStructuredSelector({
  historyData
})

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch({type: 'REFRESH'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
