import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'native-base'

const RefreshButton = ({ refresh }) =>
  <Button transparent onPress={ refresh }><Icon name="md-refresh" style={{ color: '#fff' }}/></Button>

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch({ type: 'FETCH_ALL' }),
})

export default connect(null, mapDispatchToProps)(RefreshButton)
