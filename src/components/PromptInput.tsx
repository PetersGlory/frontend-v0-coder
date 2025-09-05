import { useState } from 'react'
import { useBackendSpec } from '../contexts/BackendSpecContext'
import { Send, Sparkles, Lightbulb } from 'lucide-react'

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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-glow">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-neutral-900">Describe Your Backend</h2>
          <p className="text-neutral-600">Be as detailed as possible for better results</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your backend requirements in natural language... For example: 'Build a REST API for a task management app with user authentication, projects, and tasks. Use Express, Prisma, and PostgreSQL.'"
            className="w-full px-6 py-6 min-h-[180px] resize-none textarea text-base leading-relaxed"
            disabled={isSubmitting}
          />
          
          {/* Character count */}
          <div className="absolute bottom-4 left-4 text-xs text-neutral-400">
            {prompt.length} characters
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isSubmitting}
            className="absolute bottom-4 right-4 btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {/* Tips */}
      <div className="card-gradient border-primary-200">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
            <Lightbulb className="w-4 h-4 text-accent-600" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-neutral-900 mb-3">💡 Pro Tips for Better Results:</p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Mention the tech stack you prefer (Node.js, Python, etc.)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Include authentication requirements (JWT, OAuth, etc.)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Specify database needs (PostgreSQL, MongoDB, etc.)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Describe the main entities and their relationships</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
