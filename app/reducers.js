import { fromJS } from 'immutable'

const defaultState = fromJS({

})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'DEFAULT':
      return state
    default:
      return state
  }
}
