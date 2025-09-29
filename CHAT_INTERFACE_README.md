# ChatGPT-Inspired Code Generator Frontend

A modern, interactive frontend for AI-powered code generation, featuring a ChatGPT-style interface with real-time chat, syntax highlighting, and smooth animations.

## ✨ Features

### 🎨 Modern UI/UX
- **ChatGPT-inspired interface** with message bubbles and smooth animations
- **Light/Dark mode toggle** with system preference detection
- **Responsive design** optimized for desktop and mobile
- **Smooth animations** using Framer Motion for enhanced user experience

### 💬 Chat Interface
- **Real-time chat** with typing indicators
- **Multiline input** with keyboard shortcuts (Enter to send, Shift+Enter for new line)
- **Message history** with sidebar navigation
- **Chat persistence** and management

### 🔧 Code Features
- **Syntax highlighting** for multiple programming languages
- **Copy to clipboard** functionality for code blocks
- **Code block expansion** with language detection
- **Automatic code formatting**

### 📱 Responsive Design
- **Mobile-first approach** with touch-friendly interactions
- **Collapsible sidebar** for mobile devices
- **Adaptive layouts** for different screen sizes
- **Touch gestures** support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd frontend-v0-coder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` and go to `/chat` to see the new interface.

## 🛠️ Technology Stack

### Core Technologies
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### UI/Animation Libraries
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **React Syntax Highlighter** - Code syntax highlighting

### State Management
- **React Context** - Theme and application state
- **React Router** - Client-side routing

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx      # Main chat interface
│   ├── ChatMessage.tsx        # Individual message component
│   ├── ChatInput.tsx          # Input component with shortcuts
│   ├── ChatSidebar.tsx        # Sidebar with navigation
│   └── TypingIndicator.tsx    # Loading animation
├── contexts/
│   ├── ThemeContext.tsx       # Dark/light mode management
│   └── BackendSpecContext.tsx # Existing backend integration
├── pages/
│   └── ChatPage.tsx           # Chat page wrapper
└── App.tsx                    # Updated with theme provider
```

## 🎯 Key Components

### ChatInterface
The main component that orchestrates the entire chat experience:
- Manages message state and history
- Handles API communication
- Coordinates sidebar and input components

### ChatMessage
Renders individual messages with:
- User/assistant message differentiation
- Code block detection and highlighting
- Copy-to-clipboard functionality
- Timestamp display

### ChatInput
Advanced input component featuring:
- Auto-resizing textarea
- Keyboard shortcuts (Enter/Shift+Enter)
- Attachment buttons (placeholder)
- Character count display

### ChatSidebar
Navigation sidebar with:
- Chat history management
- New chat creation
- Theme toggle
- Responsive mobile behavior

## 🎨 Customization

### Theme Customization
The app supports light/dark themes with automatic system detection. Customize colors in:
- `tailwind.config.js` - Color palette
- `src/index.css` - Dark mode styles
- `src/contexts/ThemeContext.tsx` - Theme logic

### Animation Customization
Modify animations in components using Framer Motion:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

### Code Highlighting
Customize syntax highlighting in `ChatMessage.tsx`:
```tsx
<SyntaxHighlighter
  language={language}
  style={theme === 'dark' ? oneDark : oneLight}
  // ... other props
>
```

## 🔌 Backend Integration

The chat interface integrates with your existing backend API:

### API Endpoint
```typescript
POST https://v0-coder.onrender.com/api/v2/generate-spec
Content-Type: application/json

{
  "prompt": "Your code generation request"
}
```

### Response Handling
The interface expects responses in the format:
```typescript
{
  success: boolean,
  spec: {
    framework?: string,
    database?: string,
    entities?: Array<{name: string, description: string}>,
    api?: Array<{method: string, path: string, description: string}>,
    auth?: {strategy: string}
  }
}
```

## 📱 Mobile Experience

### Responsive Features
- **Collapsible sidebar** - Tap hamburger menu to open/close
- **Touch-friendly buttons** - Optimized for finger navigation
- **Adaptive layouts** - Content adjusts to screen size
- **Swipe gestures** - Natural mobile interactions

### Mobile Navigation
1. Tap hamburger menu (☰) to open sidebar
2. Tap "New Chat" to start fresh conversation
3. Tap any chat history item to load previous conversation
4. Tap theme toggle for light/dark mode

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Environment Variables
Create `.env.local` for custom configuration:
```env
VITE_API_BASE_URL=https://your-backend-url.com
VITE_APP_NAME=Your App Name
```

## 🐛 Troubleshooting

### Common Issues

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
npm run lint
npm run build
```

**Theme not switching:**
- Check browser localStorage
- Verify `ThemeContext` is properly wrapped in App.tsx

**Code highlighting not working:**
- Ensure `react-syntax-highlighter` is installed
- Check language detection in message parsing

## 🔮 Future Enhancements

### Planned Features
- [ ] **File uploads** - Support for image and document attachments
- [ ] **Voice input** - Speech-to-text functionality
- [ ] **Export conversations** - PDF/JSON export options
- [ ] **Custom themes** - User-defined color schemes
- [ ] **Message search** - Full-text search across conversations
- [ ] **Collaborative editing** - Real-time shared sessions

### Performance Optimizations
- [ ] **Message virtualization** - Handle large conversation histories
- [ ] **Lazy loading** - Load chat history on demand
- [ ] **Offline support** - PWA capabilities
- [ ] **Message compression** - Optimize storage and transfer

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
