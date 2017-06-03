import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { uid, nextVisit, selectUser, locations } from '../app/selectors'
import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({ uid, nextVisit, selectUser, locations })
const mapDispatchToProps = dispatch => ({
  newVisit: () => dispatch({ type: 'NEW_VISIT' }),
  editVisit: (payload) => dispatch({ type: 'EDIT_VISIT', payload }),
  removeVisit: (payload) => dispatch({ type: 'REMOVE_VISIT', payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
