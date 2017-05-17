import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userData, lastVisit } from '../app/selectors'
import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({
  userData, lastVisit
})

const mapDispatchToProps = dispatch => ({
  dispatch: () => dispatch({type: 'DISPATCH'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
