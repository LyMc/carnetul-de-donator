import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { uid } from '../app/selectors'
import About from '../components/About'

const mapStateToProps = createStructuredSelector({ uid })

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(About)
