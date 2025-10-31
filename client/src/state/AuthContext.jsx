import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../utils/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) {
      setToken(t)
      setUser(JSON.parse(u))
      api.setToken(t)
    }
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    api.setToken(data.token)
    setUser(data.user)
    setToken(data.token)
  }

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    api.setToken(data.token)
    setUser(data.user)
    setToken(data.token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    api.setToken(null)
    setUser(null)
    setToken(null)
  }

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
