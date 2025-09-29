import { useState, useCallback, useRef } from 'react'
import { Message, ChatSession, BackendSpec, ApiResponse } from '../types/chat'

interface UseChatReturn {
  messages: Message[]
  currentSession: ChatSession | null
  isLoading: boolean
  error: string | null
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  retryLastMessage: () => Promise<void>
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastMessageRef = useRef<Message | null>(null)

  const generateSessionTitle = useCallback((firstMessage: string): string => {
    const words = firstMessage.trim().split(' ').slice(0, 6)
    return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '')
  }, [])

  const createSession = useCallback((firstMessage: string): ChatSession => {
    return {
      id: `session-${Date.now()}`,
      title: generateSessionTitle(firstMessage),
      timestamp: new Date(),
      messageCount: 1,
      lastMessage: firstMessage,
      isPinned: false,
      isArchived: false
    }
  }, [generateSessionTitle])

  const formatSpecResponse = useCallback((spec: BackendSpec): string => {
    return `## 🏗️ Generated Backend Specification

### Architecture Overview
- **Framework**: ${spec.framework || 'Express.js'}
- **Database**: ${spec.database || 'PostgreSQL'}
- **Authentication**: ${spec.auth?.strategy || 'JWT'}${spec.auth?.provider ? ` (${spec.auth.provider})` : ''}

### 📊 Data Models (${spec.entities?.length || 0})
${spec.entities?.map(entity => 
  `- **${entity.name}**: ${entity.description || 'Entity model'}`
).join('\n') || '- No entities defined'}

### 🔗 API Endpoints (${spec.api?.length || 0})
${spec.api?.map(endpoint => 
  `- **${endpoint.method} ${endpoint.path}**: ${endpoint.description || 'API endpoint'}`
).join('\n') || '- No endpoints defined'}

### 🛡️ Security Features
- Authentication and authorization
- Input validation and sanitization
- Rate limiting and CORS protection
- Environment-based configuration

### 📁 Project Structure
\`\`\`bash
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── tests/
├── docs/
└── package.json
\`\`\`

Would you like me to scaffold this into a complete project, or would you like to modify any part of the specification?`
  }, [])

  const sendMessage = useCallback(async (content: string): Promise<void> => {
    if (!content.trim() || isLoading) return

    setError(null)
    
    // Create new session if none exists
    if (!currentSession) {
      const newSession = createSession(content)
      setCurrentSession(newSession)
    }

    // Create user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => {
      const updated = [...prev, userMessage]
      lastMessageRef.current = userMessage
      return updated
    })

    setIsLoading(true)

    try {
      const response = await fetch('https://v0-coder.onrender.com/api/v2/generate-spec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: content.trim() }),
      })

      const data: ApiResponse<BackendSpec> = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response')
      }

      // Update user message status
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg
      ))

      // Create assistant message
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.data ? formatSpecResponse(data.data) : 
          'I apologize, but I couldn\'t generate a proper response. Could you please try rephrasing your request?',
        timestamp: new Date(),
        status: 'sent'
      }

      // Simulate realistic typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
      
      setMessages(prev => [...prev, assistantMessage])

      // Update session
      if (currentSession) {
        setCurrentSession(prev => prev ? {
          ...prev,
          messageCount: prev.messageCount + 2,
          lastMessage: assistantMessage.content.slice(0, 100) + '...'
        } : null)
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      
      // Update user message status to failed
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'failed' as const } : msg
      ))

      // Add error message
      const errorResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${errorMessage}. Please try again or rephrase your request.`,
        timestamp: new Date(),
        status: 'sent'
      }
      
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, currentSession, createSession, formatSpecResponse])

  const clearMessages = useCallback(() => {
    setMessages([])
    setCurrentSession(null)
    setError(null)
  }, [])

  const retryLastMessage = useCallback(async (): Promise<void> => {
    if (!lastMessageRef.current || lastMessageRef.current.role !== 'user') return
    
    // Remove the failed message and retry
    setMessages(prev => prev.filter(msg => msg.id !== lastMessageRef.current!.id))
    await sendMessage(lastMessageRef.current.content)
  }, [sendMessage])

  return {
    messages,
    currentSession,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage
  }
}
