import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userData } from '../app/selectors'
import History from '../components/History'

const mapStateToProps = createStructuredSelector({
  userData,
})

const mapDispatchToProps = dispatch => ({
  dispatch: () => dispatch({type: 'DISPATCH'}),
  fetchUserHistory: () => dispatch({type: 'FETCH_USER_HISTORY'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
