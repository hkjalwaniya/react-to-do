import { userConstants } from '../constants'
import { userService } from '../api'
import { history } from '../helpers'

const login = (email, password) => {
  const request = (reqEmail) => {
    return { type: userConstants.LOGIN_REQUEST, reqEmail }
  }
  const success = (user) => {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }
  const failure = (error) => {
    return { type: userConstants.LOGIN_FAILURE, error }
  }
  return async (dispatch) => {
    try {
      dispatch(request({ email }))
      const response = await userService.login(email, password)
      if (response.success === true) {
        dispatch(success(response.user))
        history.push(`/dashboard`)
      }
    } catch (err) {
      dispatch(failure(err))
    }
  }
}

const register = (firstname, lastname, username, email, password, userType) => {
  const request = (reqEmail) => {
    return { type: userConstants.REGISTER_REQUEST, reqEmail }
  }
  const success = (user) => {
    return { type: userConstants.REGISTER_SUCCESS, user }
  }
  const failure = (error) => {
    return { type: userConstants.REGISTER_FAILURE, error }
  }
  return async (dispatch) => {
    try {
      dispatch(request({ email }))
      const response = await userService.register(
        firstname,
        lastname,
        username,
        email,
        password,
        userType
      )
      if (response.success === true) {
        dispatch(success(response.user))
        history.push(`/login`)
      }
    } catch (err) {
      dispatch(failure(err))
    }
  }
}

const logout = (email) => {
  const request = () => {
    return { type: userConstants.LOGOUT_REQUEST }
  }
  const failure = (error) => {
    return { type: userConstants.LOGOUT_FAILURE, error }
  }
  return async (dispatch) => {
    try {
      const response = await userService.logout(email)
      if (response.success === true) {
        dispatch(request({}))
        history.push(`/login`)
      }
    } catch (err) {
      dispatch(failure(err))
    }
  }
}

export const userActions = {
  login,
  register,
  logout
}
