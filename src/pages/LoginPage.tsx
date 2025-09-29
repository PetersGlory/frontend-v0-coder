import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { useAuth } from '../contexts/AuthContext'
import { LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { login, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const res = await login(email, password)
    if (res.success) {
      navigate('/chat')
    } else {
      setError(res.error || 'Login failed')
    }
    setSubmitting(false)
  }

  if (isAuthenticated) {
    navigate('/generate')
  }

  return (
    <AppLayout title="Login" subtitle="Access your EaseArch account">
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="flex flex-col items-center mb-6">
            <img src="/assets/img/logo.png" alt="EaseArch Logo" className="w-14 h-14 mb-2" />
            <h2 className="text-lg font-display font-semibold text-neutral-900">EaseArch</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
              <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full" disabled={isLoading || submitting}>
              {submitting ? (
                <span className="inline-flex items-center">
                  <span className="mr-2 h-4 w-4 border-2 border-white/60 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </>
              )}
            </button>
            <p className="text-sm text-neutral-600 text-center">Don't have an account? <Link to="/register" className="text-primary-600 hover:underline">Register</Link></p>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}


