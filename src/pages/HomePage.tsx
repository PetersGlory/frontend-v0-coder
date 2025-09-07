import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, Code, Users, Plus, Zap, BookOpen, Send } from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('collaboration')
  const [prompt, setPrompt] = useState('')

  const partners = [
    { name: 'Umbrella', logo: '☂️' },
    { name: 'Philadelphia', logo: '🏛️' },
    { name: 'Denmark', logo: '🇩🇰' },
    { name: 'Volume', logo: '🔊' },
    { name: 'Springfield', logo: '🌳' }
  ]

  const stats = [
    { number: '10M+', label: 'Lines of Code Generated', description: 'Production-ready code' },
    { number: '1000+', label: 'Happy Clients Served', description: 'Global developers' },
    { number: '20+', label: 'Languages Supported', description: 'Multiple tech stacks' },
  ]

  const features = [
    {
      id: 'collaboration',
      title: 'Real-time Collaboration',
      subtitle: 'Experience seamless real-time collaboration with our platform. Work together with your team members simultaneously.',
      icon: Users,
      content: 'Efficient Team Work and Decision Making'
    },
    {
      id: 'speed',
      title: 'Speed Up Coding',
      subtitle: 'Accelerate your development process with AI-powered code generation and intelligent suggestions.',
      icon: Zap,
      content: 'Fast Development and Smart Automation'
    },
    {
      id: 'documentation',
      title: 'Documentation Generation',
      subtitle: 'Automatically generate comprehensive documentation for your projects with detailed API references.',
      icon: BookOpen,
      content: 'Auto-generated Docs and API References'
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Discover the Phase',
      description: 'Tell us about your project requirements and we\'ll analyze the best approach for your backend architecture.'
    },
    {
      number: '02',
      title: 'Develop and Iterate',
      description: 'Our AI generates the complete backend code while you can iterate and refine the specifications in real-time.'
    },
    {
      number: '03',
      title: 'Test & Deployment',
      description: 'Deploy your production-ready backend with built-in testing, monitoring, and scaling capabilities.'
    }
  ]

  const testimonials = [
    {
      quote: "EaseArch saved me hours of setup time. The generated code is production-ready and follows best practices.",
      author: "Sarah Chen",
      role: "Full-Stack Developer",
      company: "TechCorp"
    },
    {
      quote: "I was able to prototype a complete backend API in minutes instead of days. Incredible tool!",
      author: "Marcus Rodriguez",
      role: "Backend Engineer",
      company: "StartupXYZ"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 via-transparent to-secondary-100/20"></div>
        <div className="container relative">
          <div className="text-center">
            {/* Main Heading with Plus Icons */}
            <h1 className="text-5xl md:text-7xl font-display font-bold text-neutral-900 mb-6 leading-tight animate-slide-up">
              <span className="flex items-center justify-center gap-4">
                <Plus className="w-8 h-8 text-primary-500 animate-pulse" />
                AI-Powered Code Generation Made Simple!
                <Plus className="w-8 h-8 text-secondary-500 animate-pulse" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Welcome to the future of programming. With our cutting-edge AI code generation platform, you can revolutionize the way you develop software.
            </p>

            {/* Input Field and Generate Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Explain which project you want to develop..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-neutral-300 rounded-xl bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-soft"
                />
              </div>
              <Link
                to="/generate"
                className="btn-primary btn-lg group px-8"
              >
                <span>Generate Code</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Code Editor Visual */}
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="card-glass bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-6 shadow-soft">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-sm font-mono text-neutral-500">index.js</span>
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-neutral-500" />
                    <span className="text-sm text-neutral-500">Mongoose Schema</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* File Explorer */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                    <div className="text-sm font-mono text-neutral-600 mb-2">File Explorer</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center text-neutral-700">
                        <span className="mr-2">📁</span> wispy
                      </div>
                      <div className="flex items-center text-neutral-700 ml-4">
                        <span className="mr-2">📁</span> .github
                      </div>
                      <div className="flex items-center text-neutral-700 ml-4">
                        <span className="mr-2">📁</span> node_modules
                      </div>
                      <div className="flex items-center text-neutral-700 ml-4">
                        <span className="mr-2">📁</span> src
                      </div>
                      <div className="flex items-center text-neutral-700">
                        <span className="mr-2">📄</span> .gitignore
                      </div>
                      <div className="flex items-center text-neutral-700">
                        <span className="mr-2">📄</span> index.js
                      </div>
                      <div className="flex items-center text-neutral-700">
                        <span className="mr-2">📄</span> README.md
                      </div>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                    <pre className="text-sm font-mono text-neutral-700 overflow-x-auto">
                      <code>
                        <span className="text-blue-600">import</span> mongoose, &#123; Schema &#125; <span className="text-blue-600">from</span> <span className="text-green-600">'mongoose'</span>;<br/>
                        <br/>
                        <span className="text-gray-500">// Define a simple Product schema</span><br/>
                        <span className="text-blue-600">const</span> productSchema = <span className="text-blue-600">new</span> Schema(&#123;<br/>
                        &nbsp;&nbsp;name: &#123; <span className="text-blue-600">type</span>: String, <span className="text-blue-600">required</span>: <span className="text-purple-600">true</span> &#125;,<br/>
                        &nbsp;&nbsp;description: &#123; <span className="text-blue-600">type</span>: String &#125;,<br/>
                        &nbsp;&nbsp;price: &#123; <span className="text-blue-600">type</span>: Number, <span className="text-blue-600">required</span>: <span className="text-purple-600">true</span> &#125;,<br/>
                        &#125;, &#123; <span className="text-blue-600">timestamps</span>: <span className="text-purple-600">true</span> &#125;);<br/>
                        <br/>
                        <span className="text-blue-600">export default</span> mongoose.<span className="text-red-600">model</span>(<span className="text-green-600">'Product'</span>, productSchema);
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Database Schema Table */}
                <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                  <div className="text-sm font-mono text-neutral-600 mb-2">Database Schema</div>
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div className="font-semibold text-neutral-800">id (int)</div>
                    <div className="font-semibold text-neutral-800">username (varchar(50))</div>
                    <div className="font-semibold text-neutral-800">email (varchar(250))</div>
                    <div className="font-semibold text-neutral-800">phone (varchar(250))</div>
                    <div className="font-semibold text-neutral-800">created_at (timestamp)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4 animate-fade-in">
              Trusted by Leading Innovators: Our Partners.
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto animate-fade-in animate-delay-200">
              We are proud to have earned the trust and confidence of industry leaders and innovators around the globe for those who demand the best.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 animate-slide-up">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors duration-300">
                <Plus className="w-4 h-4 text-primary-500" />
                <span className="text-lg font-medium">{partner.logo} {partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us / Statistics Section */}
      <section className="section bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">
                Empowering Coders with AI-Driven Solutions.
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                With a focus on integrity, excellence, continuous improvement, we strive to be at the forefront of development.
              </p>
              <Link
                to="/about"
                className="btn-primary btn-lg group"
              >
                <span>More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              {stats.map((stat, index) => (
                <div key={index} className="card-hover text-center p-6">
                  <div className="text-4xl font-display font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-neutral-900 font-semibold mb-1">{stat.label}</div>
                  <div className="text-neutral-600 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Efficiency Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4 animate-fade-in">
              <span className="flex items-center justify-center gap-4">
                <Plus className="w-8 h-8 text-primary-500 animate-pulse" />
                Maximize Output with Essential Efficiency Features.
                <Plus className="w-8 h-8 text-secondary-500 animate-pulse" />
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto animate-fade-in animate-delay-200">
              natural language processing integration, cross-language support, and the seamless version control integration.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === feature.id
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-200 shadow-soft'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{feature.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Active Feature Content */}
            <div className="card-glass bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-8 shadow-soft">
              {features.map((feature) => {
                if (activeTab !== feature.id) return null
              const Icon = feature.icon
              return (
                  <div key={feature.id} className="animate-fade-in">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-neutral-900">{feature.title}</h3>
                        <p className="text-neutral-600">{feature.subtitle}</p>
                      </div>
                    </div>

                    {/* Code Editor Visual */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        </div>
                        <span className="text-sm font-mono text-neutral-500">index.js</span>
                      </div>
                      <pre className="text-sm font-mono text-neutral-700 overflow-x-auto">
                        <code>
                          <span className="text-blue-600">import</span> mongoose, &#123; Schema &#125; <span className="text-blue-600">from</span> <span className="text-green-600">'mongoose'</span>;<br/>
                          <br/>
                          <span className="text-gray-500">// Define a simple Product schema</span><br/>
                          <span className="text-blue-600">const</span> productSchema = <span className="text-blue-600">new</span> Schema(&#123;<br/>
                          &nbsp;&nbsp;name: &#123; <span className="text-blue-600">type</span>: String, <span className="text-blue-600">required</span>: <span className="text-purple-600">true</span> &#125;,<br/>
                          &nbsp;&nbsp;description: &#123; <span className="text-blue-600">type</span>: String &#125;,<br/>
                          &nbsp;&nbsp;price: &#123; <span className="text-blue-600">type</span>: Number, <span className="text-blue-600">required</span>: <span className="text-purple-600">true</span> &#125;,<br/>
                          &#125;, &#123; <span className="text-blue-600">timestamps</span>: <span className="text-purple-600">true</span> &#125;);<br/>
                          <br/>
                          <span className="text-blue-600">export default</span> mongoose.<span className="text-red-600">model</span>(<span className="text-green-600">'Product'</span>, productSchema);
                        </code>
                      </pre>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="card-hover p-6">
                        <h4 className="text-lg font-semibold text-neutral-800 mb-2">Efficient Team Work</h4>
                        <p className="text-neutral-600 text-sm">Collaborate seamlessly with your team members in real-time.</p>
                      </div>
                      <div className="card-hover p-6">
                        <h4 className="text-lg font-semibold text-neutral-800 mb-2">Decision Making</h4>
                        <p className="text-neutral-600 text-sm">Make informed decisions with AI-powered insights and suggestions.</p>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4 animate-fade-in">
              Navigate Journey: Our Process Explained!
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto animate-fade-in animate-delay-200">
              Designed for conception to completion, transparency, efficiency and results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Process Steps */}
            <div className="space-y-8 animate-slide-up">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-display font-bold text-white">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-3 group-hover:text-gradient transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Interface */}
            <div className="card-glass bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-6 shadow-soft animate-fade-in">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Project Chat</h3>
                <p className="text-sm text-neutral-600">Describe your project and get instant feedback</p>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <div className="bg-neutral-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-neutral-700">Say what project you want to develop...</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 max-w-xs">
                    <pre className="text-xs font-mono text-neutral-700">
                      <code>
                        CREATE TABLE chat (<br/>
                        &nbsp;&nbsp;id INT PRIMARY KEY,<br/>
                        &nbsp;&nbsp;message TEXT,<br/>
                        &nbsp;&nbsp;user_id INT,<br/>
                        &nbsp;&nbsp;created_at TIMESTAMP<br/>
                        );
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">U</span>
              </div>
                  <div className="bg-neutral-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-neutral-700">Please have a question about the code?</p>
            </div>
              </div>
            </div>

              {/* Chat Input */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Ask about your project..."
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="btn-primary btn-sm">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4 animate-fade-in">
              Loved by Developers
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto animate-fade-in animate-delay-200">
              See what developers are saying about EaseArch
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                    <div className="text-sm text-neutral-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
                <p className="text-neutral-700 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 animate-fade-in">
            Ready to Build Your Backend?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in animate-delay-200">
            Join the future of backend development. Generate, customize, and deploy in minutes, not hours.
          </p>
          <Link 
            to="/generate" 
            className="btn-secondary btn-lg group animate-scale-in"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
}
