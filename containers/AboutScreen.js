import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { uid } from '../app/selectors'
import About from '../components/About'

const mapStateToProps = createStructuredSelector({ uid })

const mapDispatchToProps = dispatch => ({
  log: (event, props) => dispatch({ type: 'LOG_EVENT', payload: { event, props} }),
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
