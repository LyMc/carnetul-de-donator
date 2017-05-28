import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { uid } from '../app/selectors'
import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({
  uid,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
