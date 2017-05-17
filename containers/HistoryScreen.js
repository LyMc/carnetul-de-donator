import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { historyData, currentData } from '../app/selectors'

import History from '../components/History'

const mapStateToProps = createStructuredSelector({
  historyData, currentData
})

const mapDispatchToProps = dispatch => ({
  dispatch: () => dispatch({type: 'DISPATCH'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
