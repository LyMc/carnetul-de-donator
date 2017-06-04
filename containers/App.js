import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { AuthRouter, MainRouter } from '../app/router'
import { uid } from '../app/selectors'
import Loading from '../components/Loading'

class App extends React.Component {
  render() {
    return this.props.uid === null ? <Loading message="Validare utilizator"/> : this.props.uid ? <MainRouter/> : <AuthRouter/>
  }
}

const mapStateToProps = createStructuredSelector({ uid })
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
