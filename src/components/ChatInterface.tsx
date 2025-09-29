import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Menu, AlertCircle, RefreshCw } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ChatSidebar from './ChatSidebar'
import TypingIndicator from './TypingIndicator'
import { ChatSession } from '../types/chat'

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const {
    messages,
    currentSession,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage
  } = useChat()

  // Mock chat history - in a real app, this would come from your backend
  const [chatHistory] = useState<ChatSession[]>([
    {
      id: 'session-1',
      title: 'E-commerce Backend API',
      timestamp: new Date('2024-01-15'),
      messageCount: 12,
      isPinned: true,
      lastMessage: 'Generated complete REST API with authentication...'
    },
    {
      id: 'session-2',
      title: 'React Dashboard Component',
      timestamp: new Date('2024-01-14'),
      messageCount: 8,
      lastMessage: 'Created responsive dashboard with charts...'
    },
    {
      id: 'session-3',
      title: 'Python Data Processing',
      timestamp: new Date('2024-01-13'),
      messageCount: 15,
      isPinned: true,
      lastMessage: 'Built data pipeline with pandas and numpy...'
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleNewChat = () => {
    clearMessages()
    setSidebarOpen(false)
  }

  const handleSelectChat = (_chatId: string) => {
    // In a real app, you would load the chat history here
    setSidebarOpen(false)
  }

  const handleRetryMessage = () => {
    retryLastMessage()
  }

  // Show welcome message only if no messages exist
  const showWelcomeMessage = messages.length === 0

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        selectedChatId={currentSession?.id}
        chatHistory={chatHistory}
        currentSession={currentSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-800 transition-colors rounded-lg hover:bg-neutral-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-transparent rounded-xl flex items-center justify-center shadow-sm">
                <img src="./assets/img/logo.png" alt={"logo"} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">
                  Code Architecture
                </h1>
                <p className="text-sm text-neutral-500">
                  Generate, explain, and optimize code
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentSession && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-neutral-100 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-neutral-600">
                  {currentSession.messageCount} messages
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {/* Welcome Message */}
            {showWelcomeMessage && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-transparent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <img src="./assets/img/logo.png" alt={"logo"} />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  Welcome to EaseArch
                </h2>
                <p className="text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  I'm your AI-powered coding assistant. I can help you generate complete backend specifications, 
                  explain code, convert between languages, and provide best practices for your projects.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white border border-neutral-200 rounded-lg p-4 text-left">
                    <h3 className="font-medium text-neutral-900 mb-2">🏗️ Backend Generation</h3>
                    <p className="text-sm text-neutral-600">
                      Generate complete REST APIs with authentication, database models, and documentation.
                    </p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-lg p-4 text-left">
                    <h3 className="font-medium text-neutral-900 mb-2">🔍 Code Explanation</h3>
                    <p className="text-sm text-neutral-600">
                      Get detailed explanations of complex code snippets with examples and best practices.
                    </p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-lg p-4 text-left">
                    <h3 className="font-medium text-neutral-900 mb-2">🔄 Language Conversion</h3>
                    <p className="text-sm text-neutral-600">
                      Convert code between different programming languages and frameworks seamlessly.
                    </p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-lg p-4 text-left">
                    <h3 className="font-medium text-neutral-900 mb-2">💡 Best Practices</h3>
                    <p className="text-sm text-neutral-600">
                      Get recommendations for clean, maintainable, and scalable code architecture.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                  <button
                    onClick={handleRetryMessage}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry</span>
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            <AnimatePresence>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onRetry={message.status === 'failed' ? handleRetryMessage : undefined}
                />
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isLoading && <TypingIndicator />}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          disabled={!!error}
          placeholder={showWelcomeMessage ? "Describe what you'd like to build..." : "Continue the conversation..."}
        />
      </div>
    </div>
  )
}