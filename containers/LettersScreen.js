import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userLetters, letters, letterCategories } from '../app/selectors'
import Letters from '../components/Letters'

const mapStateToProps = createStructuredSelector({
  userLetters, letters, letterCategories
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Letters)
