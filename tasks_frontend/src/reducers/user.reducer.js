import { userConstants } from '../constants'

const initialState = {
  loggedIn: false,
  user: {},
  userToken: '',
  error: ''
}

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: false,
        user: action.user
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user.userData,
        userToken: action.user.userToken,
        error: null
      }
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        error: action.error
      }
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false
      }
    case userConstants.REGISTER_FAILURE:
      return {
        error: action.error,
        loading: false
      }
    case userConstants.LOGOUT_REQUEST:
      localStorage.removeItem('persist:root')
      return {
        ...initialState
      }
    case userConstants.LOGOUT_FAILURE:
      return {
        ...state,
        loggedIn: true,
        error: action.error
      }
    default:
      return state
  }
}
