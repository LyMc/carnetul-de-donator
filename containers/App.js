import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { View } from 'native-base'
import { AuthRouter, MainRouter } from '../app/router'
import { isUserSignedIn } from '../app/selectors'

class App extends React.Component {
  render() {
    return this.props.isUserSignedIn === null ? <View /> : this.props.isUserSignedIn ? <MainRouter/> : <AuthRouter/>
  }
}

const mapStateToProps = createStructuredSelector({
  isUserSignedIn,
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
