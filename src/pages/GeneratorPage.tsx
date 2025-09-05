import { useState } from 'react'
import { useBackendSpec } from '../contexts/BackendSpecContext'
import PromptInput from '../components/PromptInput'
import SpecDisplay from '../components/SpecDisplay'
import ScaffoldButton from '../components/ScaffoldButton'
import { Loader2, CheckCircle, AlertCircle, Sparkles} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import AppLayout from '../components/AppLayout'

export default function GeneratorPage() {
  const { spec, isLoading, error } = useBackendSpec()
  const [isScaffolding, setIsScaffolding] = useState(false)
  const [scaffoldResult, setScaffoldResult] = useState<{
    success: boolean
    message: string
    localPath?: string
  } | null>(null)
  const location = useLocation()

  console.log(location)

  const examplePrompts = [
    "Build a REST API for a task management app with user authentication, projects, and tasks. Use Express, Prisma, and PostgreSQL.",
    "Create a FastAPI backend for an e-commerce platform with products, orders, users, and payment processing. Use SQLModel and PostgreSQL.",
    "Generate a Node.js backend for a social media app with user profiles, posts, comments, and real-time notifications.",
    "Build a Python backend for a booking system with rooms, reservations, and payment integration. Use FastAPI and PostgreSQL."
  ]

  return (
    <AppLayout
      title="Welcome back to EaseArch"
      subtitle="Ready to generate your next backend?"
    >
      <div className="space-y-8">
        {/* Prompt Input */}
        <div className="card">
          <PromptInput />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="card text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
            </div>
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">AI is generating your backend specification...</h3>
            <p className="text-neutral-600">This usually takes 10-30 seconds</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="card border-red-200 bg-red-50/50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-red-800 text-lg">Generation Failed</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Generated Specification */}
        {spec && (
          <div className="space-y-8">
            <div className="card overflow-hidden">
              <SpecDisplay spec={spec} />
            </div>
            
            {/* Scaffold Actions */}
            <div className="card text-center">
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-3">
                  Ready to Scaffold?
                </h3>
                <p className="text-neutral-600 text-lg">
                  Generate the complete project files and start building your backend.
                </p>
              </div>
              
              {scaffoldResult ? (
                <div className={`p-6 rounded-xl ${
                  scaffoldResult.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      {scaffoldResult.success ? (
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`font-display font-semibold text-lg ${
                        scaffoldResult.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {scaffoldResult.message}
                      </p>
                      {scaffoldResult.localPath && (
                        <p className="text-green-700 text-sm mt-1">
                          Project generated at: {scaffoldResult.localPath}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <ScaffoldButton
                  spec={spec}
                  onScaffoldStart={() => setIsScaffolding(true)}
                  onScaffoldComplete={(result) => {
                    setIsScaffolding(false)
                    setScaffoldResult(result)
                  }}
                  isScaffolding={isScaffolding}
                />
              )}
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!spec && !isLoading && !error && (
          <div className="card text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow">
              <Sparkles className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
              Start Building Your Backend
            </h3>
            <p className="text-neutral-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Describe your backend requirements in natural language and let AI generate a complete specification with all the code you need.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {examplePrompts.slice(0, 2).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const textarea = document.getElementById('prompt') as HTMLTextAreaElement
                    if (textarea) {
                      textarea.value = prompt
                      textarea.dispatchEvent(new Event('input', { bubbles: true }))
                    }
                  }}
                  className="btn-secondary btn-sm"
                >
                  {prompt.split(' ').slice(0, 4).join(' ')}...
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
