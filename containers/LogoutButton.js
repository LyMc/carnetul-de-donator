import React from 'react'
import { connect } from 'react-redux'
import { Button, Text } from 'native-base'

const LogoutButton = ({ logout }) => (
  <Button transparent full onPress={ logout }
    style={{ position: 'absolute', bottom: 15, width: '100%' }}>
    <Text>Deautentificare</Text>
  </Button>
)

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'DO_LOGOUT' }),
})

export default connect(null, mapDispatchToProps)(LogoutButton)
