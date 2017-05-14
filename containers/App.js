import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Spinner } from 'native-base'
import { AuthRouter, MainRouter } from '../app/router'
import { userData } from '../app/selectors'
import { firebaseAuth } from '../app/firebase'

class App extends React.Component {
  componentDidMount() {
    firebaseAuth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.signIn(authUser.uid, authUser.email, authUser.displayName || '')
      } else {
        this.props.signOut()
      }
    })
  }
  render() {
    return this.props.userData.signed === null ? <Spinner/> : this.props.userData.signed ? <MainRouter/> : <AuthRouter/>
  }
}

const mapStateToProps = createStructuredSelector({
  userData,
})
const mapDispatchToProps = dispatch => ({
  signIn: (uid, email, name) => dispatch({type: 'SIGN_IN', payload: {uid, email, name}}),
  signOut: () => dispatch({type: 'SIGN_OUT'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
