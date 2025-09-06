import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, History, BookOpen, Code, Settings, Zap, MessageSquare, User, ChevronRight } from 'lucide-react'

interface AppLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation()

  const examplePrompts = [
    "Build a REST API for a task management app with user authentication, projects, and tasks. Use Express, Prisma, and PostgreSQL.",
    "Create a FastAPI backend for an e-commerce platform with products, orders, users, and payment processing. Use SQLModel and PostgreSQL.",
    "Generate a Node.js backend for a social media app with user profiles, posts, comments, and real-time notifications.",
    "Build a Python backend for a booking system with rooms, reservations, and payment integration. Use FastAPI and PostgreSQL."
  ]

  const navItems = [
    { path: '/generate', label: 'Generate', icon: MessageSquare },
    { path: '/history', label: 'History', icon: History },
    { path: '/templates', label: 'Templates', icon: BookOpen },
    { path: '/docs', label: 'Documentation', icon: Code },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 flex">
      {/* Left Sidebar - Controls & Navigation */}
      <div className="w-72 bg-white/80 backdrop-blur-sm border-r border-neutral-200/50 flex flex-col shadow-soft">
        {/* Header Section */}
        <div className="p-6 border-b border-neutral-200/50 bg-gradient-to-br from-primary-50/50 to-secondary-50/50">
          <Link to={"/"} className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-glow">
              <img src="/assets/img/logo.png" alt="EaseArch Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-gradient">EaseArch</h2>
              <p className="text-xs text-neutral-600">Easy Architecture, Powerful Results</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-neutral-200/50">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 border border-primary-200 shadow-soft'
                      : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Example Prompts Section */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Quick Examples</span>
          </h3>
          <div className="space-y-3">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => {
                  window.location.href = `/generate?prompt=${encodeURIComponent(prompt)}`
                }}
                className="w-full text-left p-4 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 rounded-xl border border-neutral-200 hover:border-primary-300 transition-all duration-200 bg-white/50 hover:shadow-soft group"
              >
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="line-clamp-3 leading-relaxed">{prompt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-neutral-200/50 bg-gradient-to-r from-neutral-50/50 to-primary-50/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-soft">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">Developer</p>
              <p className="text-xs text-neutral-500">Ready to build</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white/60 backdrop-blur-sm flex flex-col">

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
