import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { History, BookOpen, Code, Settings, MessageSquare, User, ChevronRight, X, Menu } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface AppLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()

  const navItems = [
    { path: '/chat', label: 'AI Assistant', icon: MessageSquare },
    { path: '/history', label: 'History', icon: History },
    { path: '/templates', label: 'Templates', icon: BookOpen },
    { path: '/docs', label: 'Documentation', icon: Code },
    { path: '/pricing', label: 'Pricing', icon: Settings },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-sm border-b border-neutral-200/50 shadow-soft">
        <div className="flex items-center justify-between p-4">
          <Link to={"/"} className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow">
              <img src="/assets/img/logo.png" alt="EaseArch Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-gradient">EaseArch</h2>
              <p className="text-xs text-neutral-600">Easy Architecture, Powerful Results</p>
            </div>
          </Link>
          {isAuthenticated && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Mobile Overlay */}
        {isAuthenticated && isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar - Controls & Navigation */}
        <div className={`
          ${isAuthenticated ? '' : 'hidden'}
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-72 bg-white/80 backdrop-blur-sm border-r h-screen border-neutral-200/50 flex flex-col shadow-soft
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Header Section */}
          <div className="p-4 lg:p-6 border-b border-neutral-200/50 bg-gradient-to-br from-primary-50/50 to-secondary-50/50">
            <Link to={"/"} className="flex items-center space-x-3 mb-3" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-glow">
                <img src="/assets/img/logo.png" alt="EaseArch Logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
              </div>
              <div>
                <h2 className="text-base lg:text-lg font-display font-bold text-gradient">EaseArch</h2>
                <p className="text-xs text-neutral-600">Easy Architecture, Powerful Results</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="p-3 lg:p-4 flex-1 border-b border-neutral-200/50">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 border border-primary-200 shadow-soft'
                        : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 ml-auto" />}
                  </Link>
                )
              })}
            </div>
          </div>

          

          {/* User Profile */}
          <div className="p-3 lg:p-4 border-t border-neutral-200/50 bg-gradient-to-r from-neutral-50/50 to-primary-50/30">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-soft">
                {user?.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={`${user.first_name || user.username || 'User'}'s avatar`}
                    className="w-full h-full rounded-lg lg:rounded-xl object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-neutral-900 truncate">
                  {user?.first_name && user?.last_name 
                    ? `${user.first_name} ${user.last_name}`
                    : user?.username || user?.email?.split('@')[0] || 'User'
                  }
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.email || 'Ready to build'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white/60 backdrop-blur-sm flex flex-col min-h-screen lg:min-h-0">
          {/* Page Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}