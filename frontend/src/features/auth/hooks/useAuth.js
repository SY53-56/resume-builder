import { useCallback, useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, logout, register } from "../services/auth.api"

export const useAuth = () => {

  const { user, setUser, loading, setLoading } = useContext(AuthContext)

  const handleLogin = useCallback(async ({ email, password }) => {
    setLoading(true)

    try {
      const res = await login({ email, password })

      if (res.success) {
        setUser(res.user)
        return res
      } else {
        return res
      }

    } finally {
      setLoading(false)
    }
  }, [setLoading, setUser])


  const handleRegister = useCallback(async ({ username, email, password }) => {
    setLoading(true)

    try {
      const res = await register({ username, email, password })

      if (res.success) {
        setUser(res.user)
      }

      return res

    } finally {
      setLoading(false)
    }
  }, [setLoading, setUser])


  const handleLogout = useCallback(async () => {
    setLoading(true)

    try {
      await logout()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setUser])

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout
  }
}