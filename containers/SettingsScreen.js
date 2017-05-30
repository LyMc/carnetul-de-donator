import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { settings } from '../app/selectors'
import Settings from '../components/Settings'

const mapStateToProps = createStructuredSelector({ settings })
const mapDispatchToProps = dispatch => ({
  change: (field, value) => dispatch({ type: 'USER/CHANGE', payload: { section: 'settings', field, value }}),
  save: () => dispatch({ type: 'SAVE_SETTINGS', payload: 'settings' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
