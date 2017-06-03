import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { history, locations } from '../app/selectors'
import History from '../components/History'

const mapStateToProps = createStructuredSelector({ history, locations })
const mapDispatchToProps = dispatch => ({
  editVisit: (payload) => dispatch({ type: 'EDIT_VISIT', payload }),
  removeVisit: (payload) => dispatch({ type: 'REMOVE_VISIT', payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
