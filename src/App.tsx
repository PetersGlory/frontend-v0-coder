import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import TemplatesPage from './pages/TemplatesPage'
import DocumentationPage from './pages/DocumentationPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PricingPage from './pages/PricingPage'
import ChatPage from './pages/ChatPage'
import RequireAuth from './components/RequireAuth'
import ErrorBoundary from './components/ErrorBoundary'
import { BackendSpecProvider } from './contexts/BackendSpecContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === "/pricing" || location.pathname === '/login' || location.pathname === "/register"
  const isChatPage = location.pathname === '/chat'

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BackendSpecProvider>
          <div className={`min-h-screen flex flex-col ${
            isChatPage 
              ? 'bg-gradient-to-br from-neutral-50 via-white to-primary-50/20' 
              : 'bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900'
          }`}>
            {isHomePage && <Header />}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/chat" element={<RequireAuth><ChatPage /></RequireAuth>} />
                <Route path="/generate" element={<Navigate to="/chat" replace />} />
                <Route path="/history" element={<RequireAuth><HistoryPage /></RequireAuth>} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/docs" element={<DocumentationPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
              </Routes>
            </main>
            {isHomePage && <Footer />}
          </div>
        </BackendSpecProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
