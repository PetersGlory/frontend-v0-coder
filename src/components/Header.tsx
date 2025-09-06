import { Link, useLocation } from 'react-router-dom'
import { Code, Zap,  History, BookOpen, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: Code },
    { path: '/generate', label: 'Generate', icon: Zap },
    { path: '/history', label: 'History', icon: History },
    { path: '/templates', label: 'Templates', icon: BookOpen },
    { path: '/docs', label: 'Docs', icon: BookOpen },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-50 shadow-soft">
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <img src="/assets/img/logo.png" alt="EaseArch Logo" className="w-12 h-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-gradient">
                EaseArch
              </span>
              <span className="text-xs text-neutral-500 -mt-1">Easy Architecture, Powerful Results</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive ? 'nav-link-active' : 'nav-link-inactive'}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200/50 bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
