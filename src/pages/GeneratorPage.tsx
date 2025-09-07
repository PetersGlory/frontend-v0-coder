// @ts-nocheck


import { useState } from 'react'
import { useBackendSpec } from '../contexts/BackendSpecContext'
import PromptInput from '../components/PromptInput'
import SpecDisplay from '../components/SpecDisplay'
import ScaffoldButton from '../components/ScaffoldButton'
import { Loader2, CheckCircle, AlertCircle, Sparkles, Code, ArrowRight, Zap, Users, BookOpen, Play } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      

    <AppLayout>
        <div className="space-y-8">
        {/* Welcome Message */}
        {!spec && !isLoading && !error && (
        <div className="card-glass bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-8 text-center animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-display font-bold text-neutral-900 mb-6 animate-slide-up">
            Start Building Your Backend
          </h3>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
            Describe your backend requirements in natural language and let AI generate a complete specification with all the code you need.
          </p>
          
          {/* Example Prompts */}
          <div className="mb-8 animate-fade-in animate-delay-400">
            <h4 className="text-lg font-semibold text-neutral-800 mb-4">Try these examples:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const textarea = document.getElementById('prompt') as HTMLTextAreaElement
                    if (textarea) {
                      textarea.value = prompt
                      textarea.dispatchEvent(new Event('input', { bubbles: true }))
                    }
                  }}
                  className="card-hover p-4 text-left group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800 group-hover:text-primary-700 transition-colors duration-300">
                        {prompt.split(' ').slice(0, 6).join(' ')}...
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Click to use this example
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
        {/* Prompt Input */}
            <div className="py-6">
          <PromptInput />
        </div>
          </div>
        </div>
      )}
        

        {/* Loading State */}
        {isLoading && (
          <div className="card-glass bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-8 text-center shadow-soft animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse">
              <Loader2 className="w-12 h-12 animate-spin text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4 animate-slide-up">
              AI is generating your backend specification...
            </h3>
            <p className="text-lg text-neutral-600 mb-6 animate-fade-in animate-delay-200">
              This usually takes 10-30 seconds
            </p>
            
            {/* Code Editor Visual */}
            <div className="max-w-4xl mx-auto animate-fade-in animate-delay-500">
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-sm font-mono text-neutral-500">generating...</span>
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-neutral-500" />
                    <span className="text-sm text-neutral-500">AI Processing</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* File Explorer */}
                  <div className="bg-white border border-neutral-200 rounded-lg p-4">
                    <div className="text-sm font-mono text-neutral-600 mb-2">Generating Files</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center text-neutral-700">
                        <span className="mr-2">📁</span> backend
                      </div>
                      <div className="flex items-center text-neutral-700 ml-4">
                        <span className="mr-2">📁</span> src
                      </div>
                      <div className="flex items-center text-neutral-700 ml-4">
                        <span className="mr-2">📁</span> models
                      </div>
                      <div className="flex items-center text-neutral-700 ml-4">
                        <span className="mr-2">📁</span> routes
                      </div>
                      <div className="flex items-center text-neutral-700">
                        <span className="mr-2">📄</span> package.json
                      </div>
                      <div className="flex items-center text-neutral-700">
                        <span className="mr-2">📄</span> README.md
                      </div>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="bg-white border border-neutral-200 rounded-lg p-4">
                    <pre className="text-sm font-mono text-neutral-700 overflow-x-auto">
                      <code>
                        <span className="text-blue-600">// Generating backend specification...</span><br/>
                        <br/>
                        <span className="text-gray-500">// Analyzing requirements...</span><br/>
                        <span className="text-gray-500">// Creating database schema...</span><br/>
                        <span className="text-gray-500">// Generating API endpoints...</span><br/>
                        <span className="text-gray-500">// Setting up authentication...</span><br/>
                        <br/>
                        <span className="text-green-600">✓ Specification complete!</span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="card-glass bg-red-50/80 backdrop-blur-sm border border-red-200/50 p-8 shadow-soft animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-display font-bold text-red-800 mb-4 animate-slide-up">
                Generation Failed
              </h3>
              <p className="text-lg text-red-700 mb-6 animate-fade-in animate-delay-200">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary btn-lg group animate-scale-in"
              >
                <span>Try Again</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}

        {/* Generated Specification */}
        {spec && (
          <div className="space-y-8 animate-fade-in">
            {/* Success Header */}
            <div className="card-glass bg-green-50/80 backdrop-blur-sm border border-green-200/50 p-8 text-center shadow-soft">
              <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-display font-bold text-green-800 mb-4 animate-slide-up">
                Backend Specification Generated!
              </h3>
              <p className="text-lg text-green-700 animate-fade-in animate-delay-200">
                Your AI-generated backend specification is ready for scaffolding.
              </p>
            </div>

            {/* Specification Display */}
            <div className="card-glass bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-8 shadow-soft">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900">Generated Specification</h3>
                  <p className="text-neutral-600">Review your backend architecture and requirements</p>
                </div>
              </div>
              <SpecDisplay spec={spec} />
            </div>
            
            {/* Scaffold Actions */}
            <div className="card-glass bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-8 text-center shadow-soft">
              <div className="mb-8">
                <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4 animate-slide-up">
                  Ready to Scaffold?
                </h3>
                <p className="text-lg text-neutral-600 mb-6 animate-fade-in animate-delay-200">
                  Generate the complete project files and start building your backend.
                </p>
                
                {/* Feature Icons */}
                <div className="flex justify-center space-x-8 mb-8 animate-fade-in animate-delay-400">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">Fast Generation</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-secondary-600" />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">Team Ready</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-accent-600" />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">Documented</span>
                  </div>
                </div>
              </div>
              
              {scaffoldResult ? (
                <div className={`card-glass p-8 text-center shadow-soft animate-fade-in ${
                  scaffoldResult.success 
                    ? 'bg-green-50/80 border-green-200/50' 
                    : 'bg-red-50/80 border-red-200/50'
                }`}>
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                    {scaffoldResult.success ? (
                      <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                      </div>
                    )}
                  </div>
                  <h3 className={`text-2xl font-display font-bold mb-4 animate-slide-up ${
                        scaffoldResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {scaffoldResult.success ? 'Project Generated Successfully!' : 'Scaffolding Failed'}
                  </h3>
                  <p className={`text-lg mb-6 animate-fade-in animate-delay-200 ${
                    scaffoldResult.success ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {scaffoldResult.message}
                      </p>
                      {scaffoldResult.localPath && (
                    <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6 animate-fade-in animate-delay-400">
                      <p className="text-green-800 font-mono text-sm">
                        📁 {scaffoldResult.localPath}
                      </p>
                    </div>
                  )}
                  {scaffoldResult.success && (
                    <button
                      onClick={() => setScaffoldResult(null)}
                      className="btn-primary btn-lg group animate-scale-in"
                    >
                      <span>Generate Another</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}
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

      </div>
    </AppLayout>
    </div>
  )
}
