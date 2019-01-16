import {
  REGISTER_AS_OWNER_SUCCESS,
  REGISTER_AS_OWNER_FAIL,
  SET_REDIRECT_FLAG_TO_TRUE,
  SET_REDIRECT_FLAG_TO_FALSE
} from '../actions'

const initialState = {
  outcome: '',
  error: '',
  redirect: false
}

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_AS_OWNER_SUCCESS:
      return { ...state, outcome: 'success' }
    case REGISTER_AS_OWNER_FAIL:
      return { ...state, outcome: 'fail' }
    case SET_REDIRECT_FLAG_TO_TRUE:
      return { ...state, redirect: true }
    case SET_REDIRECT_FLAG_TO_FALSE:
      return { ...state, redirect: false }
    default:
      return state
  }
}
