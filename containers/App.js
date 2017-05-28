import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ToastAndroid } from 'react-native'
import { AuthRouter, MainRouter } from '../app/router'
import { uid, lastSnack } from '../app/selectors'
import Loading from '../components/Loading'

class App extends React.Component {
  componentWillReceiveProps(next) {
    if (next.lastSnack && next.lastSnack !== this.props.lastSnack) {
      ToastAndroid.show(next.lastSnack, ToastAndroid.SHORT)
      setTimeout(this.props.removeSnack, 3000)
    }
  }
  render() {
    return this.props.uid === null ? <Loading message="Validare utilizator"/> : this.props.uid ? <MainRouter/> : <AuthRouter/>
  }
}

const mapStateToProps = createStructuredSelector({ uid, lastSnack })
const mapDispatchToProps = dispatch => ({
  removeSnack: () => dispatch({ type: 'SNACKS/REMOVE' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
