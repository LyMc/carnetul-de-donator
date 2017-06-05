import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { history } from '../app/selectors'
import History from '../components/History'

const mapStateToProps = createStructuredSelector({ history })
const mapDispatchToProps = dispatch => ({
  editVisit: (payload) => dispatch({ type: 'EDIT_VISIT', payload }),
  removeVisit: (payload) => dispatch({ type: 'REMOVE_VISIT', payload }),
  log: (event, props) => dispatch({ type: 'LOG_EVENT', payload: { event, props} }),
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
