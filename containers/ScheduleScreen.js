import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userData } from '../app/selectors'
import Schedule from '../components/Schedule'

const mapStateToProps = createStructuredSelector({
  userData,
})

const mapDispatchToProps = dispatch => ({
  dispatch: () => dispatch({type: 'DISPATCH'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
