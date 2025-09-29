import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, User, Bot, RotateCcw, AlertCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Message } from '../types/chat'

interface ChatMessageProps {
  message: Message
  onRetry?: () => void
}

export default function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(blockId)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const { contentBlocks, codeBlocks } = useMemo(() => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const blocks: Array<{ type: 'text' | 'code'; content: string; language?: string }> = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(message.content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textContent = message.content.substring(lastIndex, match.index).trim()
        if (textContent) {
          blocks.push({ type: 'text', content: textContent })
        }
      }

      // Add code block
      blocks.push({
        type: 'code',
        content: match[2].trim(),
        language: match[1] || 'text'
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < message.content.length) {
      const remainingContent = message.content.substring(lastIndex).trim()
      if (remainingContent) {
        blocks.push({ type: 'text', content: remainingContent })
      }
    }

    // If no code blocks found, treat entire content as text
    if (blocks.length === 0) {
      blocks.push({ type: 'text', content: message.content })
    }

    return {
      contentBlocks: blocks,
      codeBlocks: blocks.filter(block => block.type === 'code')
    }
  }, [message.content])

  const renderTextContent = (content: string) => {
    // Handle markdown-like formatting
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let key = 0

    for (const line of lines) {
      if (line.trim() === '') {
        elements.push(<br key={key++} />)
        continue
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-lg font-semibold text-neutral-900 mt-4 mb-2">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-base font-semibold text-neutral-800 mt-3 mb-2">
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith('- **')) {
        const match = line.match(/^- \*\*(.*?)\*\*: (.+)$/)
        if (match) {
          elements.push(
            <div key={key++} className="flex mb-1">
              <span className="font-semibold text-neutral-800 min-w-0 flex-shrink-0">
                {match[1]}:
              </span>
              <span className="text-neutral-700 ml-2">{match[2]}</span>
            </div>
          )
        } else {
          elements.push(
            <div key={key++} className="text-neutral-700 mb-1">
              {line.substring(2)}
            </div>
          )
        }
      } else if (line.startsWith('- ')) {
        elements.push(
          <div key={key++} className="text-neutral-700 mb-1">
            {line.substring(2)}
          </div>
        )
      } else if (line === '---') {
        elements.push(
          <hr key={key++} className="my-4 border-neutral-200" />
        )
      } else {
        elements.push(
          <p key={key++} className="text-neutral-700 mb-2 leading-relaxed">
            {line}
          </p>
        )
      }
    }

    return <div>{elements}</div>
  }

  const isUser = message.role === 'user'
  const isFailed = message.status === 'failed'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-3 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-3xl ${isUser ? 'ml-12' : 'mr-12'}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
              : 'bg-white border border-neutral-200 text-neutral-900'
          } ${isFailed ? 'border-red-200 bg-red-50' : ''}`}
        >
          {contentBlocks.map((block, index) => (
            <div key={index}>
              {block.type === 'text' ? (
                renderTextContent(block.content)
              ) : (
                <div className="relative group my-4">
                  <div className="flex items-center justify-between bg-neutral-100 px-3 py-2 rounded-t-lg border border-neutral-200">
                    <span className="text-sm font-medium text-neutral-600">
                      {block.language}
                    </span>
                    <button
                      onClick={() => copyToClipboard(block.content, `${message.id}-${index}`)}
                      className="flex items-center space-x-1 px-2 py-1 text-xs text-neutral-500 hover:text-neutral-700 transition-colors rounded"
                    >
                      {copiedCode === `${message.id}-${index}` ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    language={block.language}
                    style={oneLight}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0 0 0.75rem 0.75rem',
                      fontSize: '0.875rem',
                      background: '#f8f9fa'
                    }}
                    showLineNumbers
                    wrapLines
                  >
                    {block.content}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ))}
          
          <div className={`flex items-center justify-between mt-3 ${
            isUser ? 'text-blue-100' : 'text-neutral-500'
          }`}>
            <div className="text-xs">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            {isFailed && onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200">
          <User className="w-4 h-4 text-neutral-600" />
        </div>
      )}
    </motion.div>
  )
}