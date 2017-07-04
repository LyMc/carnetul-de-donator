import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { nextVisit, selectUser, locations, currentDiseases, userLetters, letters, notifications, profile, settings } from '../app/selectors'
import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({ nextVisit, selectUser, locations, currentDiseases, userLetters, letters, notifications, profile, settings })
const mapDispatchToProps = dispatch => ({
  newVisit: () => dispatch({ type: 'NEW_VISIT' }),
  editVisit: (payload) => dispatch({ type: 'EDIT_VISIT', payload }),
  removeVisit: (payload) => dispatch({ type: 'REMOVE_VISIT', payload }),
  openDisease: (payload = null) => dispatch({ type: 'OPEN_DISEASE', payload }),
  removeDisease: (payload) => dispatch({ type: 'REMOVE_DISEASE', payload }),
  log: (event, props) => dispatch({ type: 'LOG_EVENT', payload: { event, props} }),
  removeNotification: (payload) => dispatch({ type: 'REMOVE_NOTIFICATION', payload }),
  removeLetter: (payload) => dispatch({ type: 'REMOVE_LETTER', payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
