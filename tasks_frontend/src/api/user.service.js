import axios from 'axios'
import config from '../config/config'

const login = async (email, password) => {
  try {
    const url = `${config.API_URL}/login`
    const data = {
      email,
      password
    }
    const response = await axios.post(url, data)
    if (response) return response.data
    return false
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

const logout = async (email) => {
  try {
    const url = `${config.API_URL}/logout`
    const data = {
      email
    }
    const response = await axios.post(url, data)
    if (response) return response.data
    return false
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

const register = async (
  firstname,
  lastname,
  username,
  email,
  password,
  userType
) => {
  try {
    const url = `${config.API_URL}/register`
    const data = {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email,
      password
    }
    const response = await axios.post(url, data)
    if (response) return response.data
    return false
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

const verifyEmail = async (token) => {
  try {
    const url = `${config.API_URL}/verify-email`
    const headers = {
      'Content-Type': 'application/json',
      token
    };

    const response = await axios.post(url, {}, {headers})
    if (response) return response.data
    return false
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export const userService = {
  login,
  register,
  logout,
  verifyEmail
}
