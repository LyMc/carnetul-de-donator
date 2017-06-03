import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userLetters, letters } from '../app/selectors'
import Letters from '../components/Letters'

const mapStateToProps = createStructuredSelector({ userLetters, letters })
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Letters)
