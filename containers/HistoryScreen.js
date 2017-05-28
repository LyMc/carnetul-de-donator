import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { history } from '../app/selectors'
import History from '../components/History'

const mapStateToProps = createStructuredSelector({
  history
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(History)
