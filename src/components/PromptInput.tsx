import { useState } from 'react'
import { useBackendSpec } from '../contexts/BackendSpecContext'
import { Lightbulb, Zap, ArrowRight, CheckCircle } from 'lucide-react'

export default function PromptInput() {
  const [prompt, setPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setSpec, setIsLoading, setError } = useBackendSpec()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isSubmitting) return

    setIsSubmitting(true)
    setIsLoading(true)
    setError(null)
    setSpec(null)

    try {
      const response = await fetch('https://v0-coder.onrender.com/spec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate specification')
      }

      if (data.success && data.spec) {
        setSpec(data.spec)
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  const maxLength = 2000
  const isNearLimit = prompt.length > maxLength * 0.8
  const isOverLimit = prompt.length > maxLength

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Tell us what you want to build and we'll generate a complete backend specification for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your backend requirements in natural language... For example: 'Build a REST API for a task management app with user authentication, projects, and tasks. Use Express, Prisma, and PostgreSQL.'"
              className={`w-full px-6 py-6 min-h-[200px] resize-none textarea text-base leading-relaxed transition-all duration-300 ${
                isOverLimit ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                isNearLimit ? 'border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500' : 
                'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
              disabled={isSubmitting}
              maxLength={maxLength}
            />
            
            {/* Character count with progress */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <div className={`text-xs font-medium ${
                isOverLimit ? 'text-red-500' : 
                isNearLimit ? 'text-yellow-600' : 
                'text-neutral-400'
              }`}>
                {prompt.length}/{maxLength}
              </div>
              {isOverLimit && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!prompt.trim() || isSubmitting || isOverLimit}
              className={`absolute bottom-4 right-4 btn-primary btn-lg group transition-all duration-300 ${
                !prompt.trim() || isOverLimit ? 'opacity-50 cursor-not-allowed' : 
                'hover:scale-105 active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Generating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Generate Backend</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Tips Section */}
      <div className="card-glass bg-gradient-to-br from-primary-50/50 to-secondary-50/50 border border-primary-200/50 p-8 shadow-soft">
        <div className="flex items-start space-x-6">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold text-neutral-900 mb-4 flex items-center space-x-2">
              <span>Pro Tips for Better Results</span>
              <Zap className="w-5 h-5 text-accent-500" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-3 h-3 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Tech Stack</p>
                    <p className="text-neutral-600 text-sm">Mention your preferred technologies (Node.js, Python, etc.)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-3 h-3 text-secondary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Authentication</p>
                    <p className="text-neutral-600 text-sm">Specify auth requirements (JWT, OAuth, etc.)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-3 h-3 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Database</p>
                    <p className="text-neutral-600 text-sm">Include database needs (PostgreSQL, MongoDB, etc.)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Entities</p>
                    <p className="text-neutral-600 text-sm">Describe main entities and their relationships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
