import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { nextVisit, selectUser, locations, currentDiseases, userLetters, letters } from '../app/selectors'
import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({ nextVisit, selectUser, locations, currentDiseases, userLetters, letters })
const mapDispatchToProps = dispatch => ({
  newVisit: () => dispatch({ type: 'NEW_VISIT' }),
  editVisit: (payload) => dispatch({ type: 'EDIT_VISIT', payload }),
  removeVisit: (payload) => dispatch({ type: 'REMOVE_VISIT', payload }),
  openDisease: (payload = null) => dispatch({ type: 'OPEN_DISEASE', payload }),
  removeDisease: (payload) => dispatch({ type: 'REMOVE_DISEASE', payload }),
  log: (event, props) => dispatch({ type: 'LOG_EVENT', payload: { event, props} }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
