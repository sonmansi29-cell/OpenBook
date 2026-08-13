import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProfile, loginUser, logoutUser, registerUser } from '../services/authService'

const AuthContext = createContext(null)
const ACCESS_TOKEN_KEY = 'openbook-access-token'
const REFRESH_TOKEN_KEY = 'openbook-refresh-token'

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(ACCESS_TOKEN_KEY) || '')
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem(REFRESH_TOKEN_KEY) || '')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(accessToken))

  const clearSession = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setAccessToken('')
    setRefreshToken('')
    setUser(null)
  }

  const saveSession = (payload) => {
    const { access, refresh } = payload.tokens
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    setAccessToken(access)
    setRefreshToken(refresh)
    setUser(payload.user)
    return payload.user
  }

  useEffect(() => {
    if (!accessToken) {
      setIsLoading(false)
      return
    }
    getProfile(accessToken).then(setUser).catch(clearSession).finally(() => setIsLoading(false))
  }, [])

  const login = async (credentials) => saveSession(await loginUser(credentials))
  const register = async (data) => saveSession(await registerUser(data))
  const logout = async () => {
    try {
      if (accessToken && refreshToken) await logoutUser(refreshToken, accessToken)
    } finally {
      clearSession()
    }
  }

  const initials = user
    ? (user.first_name || user.username || user.email).split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('')
    : ''
  const value = useMemo(() => ({
    user, accessToken, refreshToken, isLoading, initials,
    isAuthenticated: Boolean(accessToken && user), login, register, logout,
  }), [user, accessToken, refreshToken, isLoading, initials])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider.')
  return context
}
