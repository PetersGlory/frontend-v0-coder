import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import GeneratorPage from './pages/GeneratorPage'
import HistoryPage from './pages/HistoryPage'
import TemplatesPage from './pages/TemplatesPage'
import DocumentationPage from './pages/DocumentationPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PricingPage from './pages/PricingPage'
import RequireAuth from './components/RequireAuth'
import ErrorBoundary from './components/ErrorBoundary'
import { BackendSpecProvider } from './contexts/BackendSpecContext'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === "/pricing" || location.pathname === '/login' || location.pathname === "/register"

  return (
    <ErrorBoundary>
      <BackendSpecProvider>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 flex flex-col">
          {isHomePage && <Header />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/generate" element={<RequireAuth><GeneratorPage /></RequireAuth>} />
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
    </ErrorBoundary>
  )
}

export default App
