import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { uid, nextVisit, selectUser, locations, currentDiseases } from '../app/selectors'
import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({ uid, nextVisit, selectUser, locations, currentDiseases })
const mapDispatchToProps = dispatch => ({
  newVisit: () => dispatch({ type: 'NEW_VISIT' }),
  editVisit: (payload) => dispatch({ type: 'EDIT_VISIT', payload }),
  removeVisit: (payload) => dispatch({ type: 'REMOVE_VISIT', payload }),
  openDisease: (payload = null) => dispatch({ type: 'OPEN_DISEASE', payload }),
  removeDisease: (payload) => dispatch({ type: 'REMOVE_DISEASE', payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
