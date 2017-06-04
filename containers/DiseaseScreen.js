import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { myRouter, diseases } from '../app/selectors'
import Disease from '../components/Disease'

const mapStateToProps = createStructuredSelector({ myRouter, diseases })
const mapDispatchToProps = dispatch => ({
  save: (payload) => dispatch({ type: 'ADD_DISEASE', payload }),
  remove: (payload) => dispatch({ type: 'REMOVE_DISEASE', payload }),
  open: (payload = null) => dispatch({ type: 'OPEN_DISEASE', payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Disease)
