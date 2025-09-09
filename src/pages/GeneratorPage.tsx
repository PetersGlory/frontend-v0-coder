import { useState, useEffect } from 'react'
import { useBackendSpec } from '../contexts/BackendSpecContext'
import PromptInput from '../components/PromptInput'
import SpecDisplay from '../components/SpecDisplay'
import ScaffoldButton from '../components/ScaffoldButton'
import { 
   CheckCircle, AlertCircle, Code,  ArrowRight, 
  Users, Play, Brain, Rocket, Shield, Database, Cpu, 
  Globe, Layers, Terminal, FileCode, GitBranch, Server, Wifi, Calendar
} from 'lucide-react'
import AppLayout from '../components/AppLayout'

export default function GeneratorPage() {
  const { spec, isLoading, error, setSpec } = useBackendSpec()
  const [isScaffolding, setIsScaffolding] = useState(false)
  const [scaffoldResult, setScaffoldResult] = useState<{
    success: boolean
    message: string
    localPath?: string
  } | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  // Auto-advance loading steps for better UX
  useEffect(() => {
    if (isLoading) {
      const steps = ['Analyzing requirements...', 'Designing architecture...', 'Generating code...', 'Finalizing specification...']
      let stepIndex = 0
      const interval = setInterval(() => {
        setCurrentStep(stepIndex)
        stepIndex = (stepIndex + 1) % steps.length
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  const examplePrompts = [
    {
      title: "Task Management API",
      description: "Complete REST API with authentication, projects, and tasks",
      prompt: "Build a REST API for a task management app with user authentication, projects, and tasks. Use Express, Prisma, and PostgreSQL.",
      icon: Layers,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured e-commerce with payments and inventory",
      prompt: "Create a FastAPI backend for an e-commerce platform with products, orders, users, and payment processing. Use SQLModel and PostgreSQL.",
      icon: Globe,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Social Media Backend",
      description: "Real-time social platform with WebSocket support",
      prompt: "Generate a Node.js backend for a social media app with user profiles, posts, comments, and real-time notifications.",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Booking System",
      description: "Reservation system with payment integration",
      prompt: "Build a Python backend for a booking system with rooms, reservations, and payment integration. Use FastAPI and PostgreSQL.",
      icon: Calendar,
      color: "from-orange-500 to-red-500"
    }
  ]

  const loadingSteps = [
    'Analyzing requirements...',
    'Designing architecture...', 
    'Generating code...',
    'Finalizing specification...'
  ]

  const features = [
    { icon: Brain, title: "AI-Powered", description: "Advanced AI generates production-ready code" },
    { icon: Rocket, title: "Lightning Fast", description: "Generate backends in seconds, not hours" },
    { icon: Shield, title: "Secure by Default", description: "Built-in security best practices" },
    { icon: Database, title: "Database Ready", description: "Complete schema and migrations" },
    { icon: Cpu, title: "Scalable", description: "Designed for growth and performance" },
    { icon: GitBranch, title: "Version Control", description: "Git-ready project structure" }
  ]

  return (
    <AppLayout
      title="AI Backend Generator"
      subtitle="Describe your backend requirements and let AI generate a complete specification"
    >
      <div className="space-y-8">
        {/* Hero Section with Animated Background */}
        {!spec && !isLoading && !error && (
          <div className="relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
            
            <div className="relative">
              {/* Main Hero Card */}
              <div className="card-glass bg-white/90 backdrop-blur-xl border border-white/20 p-12 text-center animate-fade-in shadow-2xl">
                {/* Floating Icons Animation */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center animate-float">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute top-12 right-12 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Server className="w-6 h-6 text-purple-600" />
                </div>
                <div className="absolute bottom-8 left-16 w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                  <Database className="w-7 h-7 text-green-600" />
                </div>
                <div className="absolute bottom-12 right-8 w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <Terminal className="w-5 h-5 text-orange-600" />
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse-glow">
                    <Brain className="w-16 h-16 text-white" />
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6 animate-slide-up">
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      AI-Powered
                    </span>
                    <br />
                    <span className="text-neutral-800">Backend Generation</span>
                  </h1>
                  
                  <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
                    Transform your ideas into production-ready backends in seconds. Our advanced AI understands your requirements and generates complete, secure, and scalable backend architectures.
                  </p>

                  {/* Prompt Input */}
                  <div className="mb-12 animate-fade-in animate-delay-400">
                    <PromptInput />
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 animate-fade-in animate-delay-600">
                    {features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="group">
                          <div className="w-16 h-16 bg-gradient-to-br from-white to-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-110">
                            <Icon className="w-8 h-8 text-primary-600" />
                          </div>
                          <h4 className="text-sm font-semibold text-neutral-800 mb-1">{feature.title}</h4>
                          <p className="text-xs text-neutral-500 leading-tight">{feature.description}</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Example Prompts */}
                  <div className="animate-fade-in animate-delay-800">
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-8">Ready-to-Use Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                      {examplePrompts.map((example, index) => {
                        const Icon = example.icon
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              const textarea = document.getElementById('prompt') as HTMLTextAreaElement
                              if (textarea) {
                                textarea.value = example.prompt
                                textarea.dispatchEvent(new Event('input', { bubbles: true }))
                              }
                            }}
                            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-2xl p-6 text-left hover:shadow-xl hover:border-primary-300 transition-all duration-300 hover:-translate-y-1"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${example.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                            <div className="relative z-10">
                              <div className={`w-12 h-12 bg-gradient-to-br ${example.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                                {example.title}
                              </h4>
                              <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                                {example.description}
                              </p>
                              <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors duration-300">
                                <Play className="w-4 h-4 mr-2" />
                                Use this template
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        

        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-transparent to-secondary-50/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
            
            <div className="relative">
              <div className="card-glass bg-white/95 backdrop-blur-xl border border-white/30 p-12 text-center shadow-2xl">
                {/* Animated Brain Icon */}
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse-glow">
                  <Brain className="w-16 h-16 text-white animate-pulse" />
                </div>
                
                <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4 animate-slide-up">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    AI is Working Magic
                  </span>
                </h2>
                
                <p className="text-xl text-neutral-600 mb-8 animate-fade-in animate-delay-200">
                  {loadingSteps[currentStep]}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full max-w-md mx-auto mb-12">
                  <div className="flex justify-between text-sm text-neutral-500 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((currentStep + 1) / loadingSteps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced Code Editor Visual */}
                <div className="max-w-6xl mx-auto animate-fade-in animate-delay-500">
                  <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 shadow-2xl border border-neutral-700">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-neutral-400 font-mono text-sm">EaseArch AI Terminal</span>
                      </div>
                      <div className="flex items-center space-x-2 text-neutral-400">
                        <Wifi className="w-4 h-4 animate-pulse" />
                        <span className="text-sm">Connected</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* File Explorer */}
                      <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
                        <div className="flex items-center space-x-2 mb-4">
                          <FileCode className="w-5 h-5 text-blue-400" />
                          <span className="text-blue-400 font-mono text-sm">Project Structure</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          {[
                            { name: 'backend', type: 'folder', children: ['src', 'tests', 'docs'] },
                            { name: 'src', type: 'folder', children: ['models', 'routes', 'middleware'] },
                            { name: 'models', type: 'folder', children: ['User.js', 'Product.js'] },
                            { name: 'routes', type: 'folder', children: ['auth.js', 'api.js'] },
                            { name: 'package.json', type: 'file' },
                            { name: 'README.md', type: 'file' },
                            { name: 'Dockerfile', type: 'file' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center text-neutral-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              <span className="mr-2">
                                {item.type === 'folder' ? '📁' : '📄'}
                              </span>
                              <span className="font-mono">{item.name}</span>
                              {item.children && (
                                <span className="ml-2 text-neutral-500">({item.children.length} items)</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Live Code Generation */}
                      <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
                        <div className="flex items-center space-x-2 mb-4">
                          <Terminal className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-mono text-sm">Live Generation</span>
                        </div>
                        <pre className="text-sm font-mono text-neutral-300 overflow-x-auto">
                          <code>
                            <div className="text-blue-400">// {loadingSteps[currentStep]}</div>
                            <div className="text-neutral-500">// ─────────────────────────────</div>
                            <br />
                            <div className="text-yellow-400">const express = require('express');</div>
                            <div className="text-yellow-400">const mongoose = require('mongoose');</div>
                            <div className="text-yellow-400">const jwt = require('jsonwebtoken');</div>
                            <br />
                            <div className="text-green-400">// Database Schema</div>
                            <div className="text-neutral-300">const userSchema = new mongoose.Schema(&#123;</div>
                            <div className="text-neutral-300">  name: &#123; type: String, required: true &#125;,</div>
                            <div className="text-neutral-300">  email: &#123; type: String, unique: true &#125;</div>
                            <div className="text-neutral-300">&#125;);</div>
                            <br />
                            <div className="text-green-400">// API Routes</div>
                            <div className="text-neutral-300">app.post('/api/auth/login', async (req, res) =&gt; &#123;</div>
                            <div className="text-neutral-300">  // Authentication logic...</div>
                            <div className="text-neutral-300">&#125;);</div>
                            <br />
                            <div className="text-green-400 animate-pulse">✓ Generating middleware...</div>
                            <div className="text-green-400 animate-pulse">✓ Creating API endpoints...</div>
                            <div className="text-green-400 animate-pulse">✓ Setting up validation...</div>
                          </code>
                        </pre>
                      </div>
                    </div>
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

        {/* Enhanced Generated Specification */}
        {spec && (
          <div className="space-y-8 animate-fade-in">
            {/* Success Header with Celebration */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"></div>
              
              <div className="relative">
                <div className="card-glass bg-white/95 backdrop-blur-xl border border-green-200/50 p-12 text-center shadow-2xl">
                  {/* Animated Success Icon */}
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse-glow">
                    <CheckCircle className="w-16 h-16 text-white animate-bounce" />
                  </div>
                  
                  <h2 className="text-5xl font-display font-bold text-neutral-900 mb-6 animate-slide-up">
                    <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      🎉 Success!
                    </span>
                  </h2>
                  
                  <h3 className="text-3xl font-display font-bold text-neutral-800 mb-4 animate-fade-in animate-delay-200">
                    Backend Specification Generated
                  </h3>
                  
                  <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-400">
                    Your AI-generated backend specification is ready! Review the architecture below and scaffold your complete project.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 animate-fade-in animate-delay-600">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                      <Database className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-blue-800">{spec.entities?.length || 0}</div>
                      <div className="text-sm text-blue-600">Data Models</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                      <Code className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-purple-800">{spec.api?.length || 0}</div>
                      <div className="text-sm text-purple-600">API Endpoints</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                      <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-green-800">{spec.auth?.strategy || 'JWT'}</div>
                      <div className="text-sm text-green-600">Authentication</div>
                    </div>
                  </div>
                </div>
              </div>
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
            
            {/* Enhanced Scaffold Actions */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30"></div>
              
              <div className="relative">
                <div className="card-glass bg-white/95 backdrop-blur-xl border border-white/30 p-12 text-center shadow-2xl">
                  <div className="mb-12">
                    <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6 animate-slide-up">
                      <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        Ready to Build?
                      </span>
                    </h2>
                    <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
                      Transform your specification into a complete, production-ready backend project with all the files, dependencies, and documentation you need.
                    </p>
                    
                    {/* Enhanced Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 animate-fade-in animate-delay-400">
                      <div className="group">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Rocket className="w-10 h-10 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-neutral-800 mb-2">Lightning Fast</h4>
                        <p className="text-sm text-neutral-600">Generate complete projects in seconds</p>
                      </div>
                      <div className="group">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Shield className="w-10 h-10 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-neutral-800 mb-2">Production Ready</h4>
                        <p className="text-sm text-neutral-600">Security and best practices included</p>
                      </div>
                      <div className="group">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <GitBranch className="w-10 h-10 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-neutral-800 mb-2">Git Ready</h4>
                        <p className="text-sm text-neutral-600">Complete project structure and docs</p>
                      </div>
                    </div>
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
                      onClick={() => {
                        setSpec(null);
                        setScaffoldResult(null)}}
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
  )
}
