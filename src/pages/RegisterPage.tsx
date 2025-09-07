import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { useAuth } from '../contexts/AuthContext'
import { UserPlus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { register, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const res = await register({ email, username, password, first_name: firstName, last_name: lastName })
    if (res.success) {
      navigate('/generate')
    } else {
      setError(res.error || 'Registration failed')
    }
    setSubmitting(false)
  }

  if (isAuthenticated) {
    navigate('/generate')
  }

  return (
    <AppLayout title="Register" subtitle="Create your EaseArch account">
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="flex flex-col items-center mb-6">
            <img src="/assets/img/logo.png" alt="EaseArch Logo" className="w-14 h-14 mb-2" />
            <h2 className="text-lg font-display font-semibold text-neutral-900">EaseArch</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                <input type="text" className="input" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                <input type="text" className="input" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Username</label>
              <input type="text" className="input" value={username} onChange={e => setUsername(e.target.value)} required />
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
                  Creating account...
                </span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>
            <p className="text-sm text-neutral-600 text-center">Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Login</Link></p>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}


