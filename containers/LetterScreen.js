import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { letters } from '../app/selectors'
import Letter from '../components/Letter'

const mapStateToProps = createStructuredSelector({ letters })
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Letter)
