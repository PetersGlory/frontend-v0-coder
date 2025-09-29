import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Paperclip, Image, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  disabled?: boolean
  placeholder?: string
}

export default function ChatInput({ 
  onSendMessage, 
  isLoading, 
  disabled = false,
  placeholder = "Describe what you'd like to build..."
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading || disabled) return
    
    onSendMessage(message.trim())
    setMessage('')
    setIsExpanded(false)
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    const scrollHeight = textarea.scrollHeight
    const maxHeight = 200
    
    if (scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.height = `${scrollHeight}px`
      textarea.style.overflowY = 'hidden'
    }
    
    // Expand container if needed
    if (scrollHeight > 60 && !isExpanded) {
      setIsExpanded(true)
    } else if (scrollHeight <= 60 && isExpanded) {
      setIsExpanded(false)
    }
  }

  const handleAttachment = () => {
    // TODO: Implement file attachment
    console.log('Attachment clicked')
  }

  const handleImageUpload = () => {
    // TODO: Implement image upload
    console.log('Image upload clicked')
  }

  // Focus textarea when component mounts
  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus()
    }
  }, [disabled])

  const canSend = message.trim() && !isLoading && !disabled

  return (
    <div className="border-t border-neutral-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className={`relative bg-neutral-50 border border-neutral-200 rounded-2xl transition-all duration-200 ${
            isExpanded ? 'shadow-md' : 'shadow-sm'
          } ${disabled ? 'opacity-50' : ''}`}>
            {/* Attachment buttons */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button
                type="button"
                onClick={handleAttachment}
                disabled={disabled}
                className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors rounded-lg hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={disabled}
                className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors rounded-lg hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Upload image"
              >
                <Image className="w-4 h-4" />
              </button>
            </div>

            {/* Text input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading || disabled}
              className={`w-full px-14 py-4 pr-14 bg-transparent text-neutral-900 placeholder-neutral-500 resize-none rounded-2xl focus:outline-none transition-all duration-200 ${
                isLoading || disabled ? 'cursor-not-allowed' : 'cursor-text'
              }`}
              style={{ 
                minHeight: '52px',
                maxHeight: '200px',
                lineHeight: '1.5'
              }}
              rows={1}
            />

            {/* Send button */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <motion.button
                type="submit"
                disabled={!canSend}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  canSend
                    ? 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg'
                    : 'bg-neutral-300 cursor-not-allowed'
                }`}
                whileHover={canSend ? { scale: 1.05 } : {}}
                whileTap={canSend ? { scale: 0.95 } : {}}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className={`w-4 h-4 ${
                    canSend ? 'text-white' : 'text-neutral-500'
                  }`} />
                )}
              </motion.button>
            </div>
          </div>

          {/* Helper text */}
          <div className="flex items-center justify-between mt-3 px-2">
            <div className="text-xs text-neutral-500">
              {message.length > 0 && (
                <span>{message.length} characters</span>
              )}
            </div>
            <div className="text-xs text-neutral-400">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}