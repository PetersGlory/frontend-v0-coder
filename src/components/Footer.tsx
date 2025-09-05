import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-neutral-200/50 py-8 shadow-soft">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-gradient">EaseArch</h3>
                <p className="text-sm text-neutral-600">Easy Architecture, Powerful Results</p>
              </div>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-md">
              Generate production-ready backends with AI. From simple APIs to complex microservices, 
              we've got you covered with modern best practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/generate" className="text-neutral-600 hover:text-primary-600 transition-colors duration-200">Generate</a></li>
              <li><a href="/templates" className="text-neutral-600 hover:text-primary-600 transition-colors duration-200">Templates</a></li>
              <li><a href="/docs" className="text-neutral-600 hover:text-primary-600 transition-colors duration-200">Documentation</a></li>
              <li><a href="/history" className="text-neutral-600 hover:text-primary-600 transition-colors duration-200">History</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Connect</h4>
            <div className="flex space-x-3">
              <a href="#" className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200/50 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-600 text-sm">
            © 2025 EaseArch. Built with AI for developers.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-200">Privacy</a>
            <a href="#" className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-200">Terms</a>
            <a href="#" className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-200">Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
