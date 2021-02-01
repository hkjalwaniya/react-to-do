import axios from 'axios'

const login = async (email, password) => {
  try {
    const url = `http://localhost:5000/api/users/login`
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
    const url = `http://localhost:5000/api/users/logout`
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
    const url = `http://localhost:5000/api/users/register`
    const data = {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email,
      password,
      role: userType
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
    const url = `http://localhost:5000/api/users/verify-email`
    const headers = {
      token
    }

    const response = await axios.post(url, headers, {})
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
