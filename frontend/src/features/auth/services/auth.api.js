import axios from "axios"

const api = axios.create({
  baseURL: "https://resume-builder-9nm3.onrender.com",
  withCredentials: true
})

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password
    })

    return {
      success: true,
      user: response.data.user
    }

  } catch (e) {
    return {
      success: false,
      message: e.response?.data?.message || "Registration failed ❌"
    }
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password
    })

    return {
      success: true,
      user: response.data.user
    }

  } catch (e) {
    return {
      success: false,
      message: e.response?.data?.message || "Login failed ❌"
    }
  }
}

export async function logout() {
  try {
    await api.get("/api/auth/logout")

    return { success: true }

  } catch (e) {
    return {
      success: false,
      message: "Logout failed ❌"
    }
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me")

    return {
      success: true,
      user: response.data.user
    }

  } catch (e) {
    return {
      success: false,
      user: null
    }
  }
}