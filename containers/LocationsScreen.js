import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { locationsData } from '../app/selectors'
import Locations from '../components/Locations'

const mapStateToProps = createStructuredSelector({
  locationsData,
})

const mapDispatchToProps = dispatch => ({
  dispatch: () => dispatch({type: 'DISPATCH'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
