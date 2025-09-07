import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AuthUser, clearToken, getProfile, getToken, login as apiLogin, register as apiRegister, saveToken, updateProfile } from '../lib/api'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (body: { email: string; username: string; password: string; first_name?: string; last_name?: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshProfile: () => Promise<void>
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const isAuthenticated = !!user

  const refreshProfile = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    const res = await getProfile()
    if (res.success && res.data?.user) {
      setUser(res.data.user)
    } else {
      // token invalid
      clearToken()
      setUser(null)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    refreshProfile()
  }, [refreshProfile])

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password)
    if (res.success && res.data?.token) {
      saveToken(res.data.token)
      await refreshProfile()
      return { success: true }
    }
    return { success: false, error: res.error || 'Login failed' }
  }, [refreshProfile])

  const register = useCallback(async (body: { email: string; username: string; password: string; first_name?: string; last_name?: string }) => {
    const res = await apiRegister(body)
    if (res.success && res.data?.token) {
      saveToken(res.data.token)
      await refreshProfile()
      return { success: true }
    }
    return { success: false, error: res.error || 'Registration failed' }
  }, [refreshProfile])

  const logout = useCallback(() => {
    clearToken()
    setUser(null)
  }, [])

  const updateUserProfile = useCallback(async (updates: Partial<AuthUser>) => {
    const res = await updateProfile(updates)
    if (res.success && res.data?.user) {
      setUser(res.data.user)
      return { success: true }
    }
    return { success: false, error: res.error || 'Update failed' }
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshProfile,
    updateUserProfile,
  }), [user, isAuthenticated, isLoading, login, register, logout, refreshProfile, updateUserProfile])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


