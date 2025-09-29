export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  status?: 'sending' | 'sent' | 'failed'
  codeBlocks?: CodeBlock[]
}

export interface CodeBlock {
  language: string
  code: string
  startIndex: number
  endIndex: number
}

export interface ChatSession {
  id: string
  title: string
  timestamp: Date
  lastMessage?: string
  messageCount: number
  isPinned?: boolean
  isArchived?: boolean
}

export interface ChatState {
  messages: Message[]
  currentSession: ChatSession | null
  isLoading: boolean
  error: string | null
  sidebarOpen: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface BackendSpec {
  framework?: string
  database?: string
  auth?: {
    strategy: string
    provider?: string
  }
  entities?: Array<{
    name: string
    description: string
    fields?: Array<{
      name: string
      type: string
      required: boolean
    }>
  }>
  api?: Array<{
    method: string
    path: string
    description: string
    parameters?: Array<{
      name: string
      type: string
      required: boolean
    }>
  }>
}
