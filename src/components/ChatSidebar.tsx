import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  History, 
  Settings, 
  Plus, 
  X, 
  Star,
  Archive,
  Trash2
} from 'lucide-react'
import { ChatSession } from '../types/chat'

interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  selectedChatId?: string
  chatHistory: ChatSession[]
  currentSession?: ChatSession | null
}

export default function ChatSidebar({
  isOpen,
  onToggle,
  onNewChat,
  onSelectChat,
  selectedChatId,
  chatHistory,
  currentSession
}: ChatSidebarProps) {
  const [, setHoveredChat] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const navigationItems = [
    { icon: MessageSquare, label: 'New Chat', active: true },
    { icon: History, label: 'History', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ]

  const recentChats = chatHistory.slice(0, 8)
  const pinnedChats = chatHistory.filter(chat => chat.isPinned)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isDesktop ? 0 : (isOpen ? 0 : -320),
          opacity: isDesktop ? 1 : (isOpen ? 1 : 0)
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-80 bg-white border-r border-neutral-200 z-50 flex flex-col shadow-lg lg:shadow-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-transparent rounded-xl flex items-center justify-center shadow-sm">
              <img src="./assets/img/logo.png" alt="logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-neutral-900">
                EaseArch
              </h1>
              <p className="text-xs text-neutral-500">Code Architecture</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 text-neutral-500 hover:text-neutral-700 transition-colors rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-6 py-4">
          <motion.button
            onClick={onNewChat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </motion.button>
        </div>

        {/* Navigation */}
        <div className="px-6 mb-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    item.active
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              )
            })}
          </nav>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4">
          {/* Current Session */}
          {currentSession && (
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Current
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-blue-900 truncate">
                      {currentSession.title}
                    </div>
                    <div className="text-xs text-blue-600">
                      {currentSession.messageCount} messages
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Pinned Chats */}
          {pinnedChats.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Pinned
              </h3>
              <div className="space-y-1">
                {pinnedChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ x: 4 }}
                    className="group"
                    onMouseEnter={() => setHoveredChat(chat.id)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <button
                      onClick={() => onSelectChat(chat.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                        selectedChatId === chat.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                      }`}
                    >
                      <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium truncate">{chat.title}</div>
                        <div className="text-xs text-neutral-500 truncate">
                          {chat.lastMessage || `${chat.messageCount} messages`}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-neutral-400 hover:text-neutral-600">
                          <Archive className="w-3 h-3" />
                        </button>
                        <button className="p-1 text-neutral-400 hover:text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Chats */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Recent
            </h3>
            <div className="space-y-1">
              {recentChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ x: 4 }}
                  className="group"
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                >
                  <button
                    onClick={() => onSelectChat(chat.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                      selectedChatId === chat.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs text-neutral-500 truncate">
                        {chat.lastMessage || `${chat.messageCount} messages`}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400">
                      {formatDate(chat.timestamp)}
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-neutral-400 hover:text-neutral-600">
                        <Star className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="text-xs text-neutral-500">
              v1.0.0
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-neutral-500">Online</span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}