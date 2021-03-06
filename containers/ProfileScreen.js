import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { profile } from '../app/selectors'
import Profile from '../components/Profile'

const mapStateToProps = createStructuredSelector({ profile })
const mapDispatchToProps = dispatch => ({
  change: (field, value) => dispatch({ type: 'USER/CHANGE', payload: { section: 'profile', field, value }}),
  save: () => dispatch({ type: 'SAVE_SETTINGS', payload: 'profile' }),
  log: (event, props) => dispatch({ type: 'LOG_EVENT', payload: { event, props} }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
