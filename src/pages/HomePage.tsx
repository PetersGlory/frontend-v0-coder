import { Link } from 'react-router-dom'
import { ArrowRight, Code, Database, Shield, Rocket, Sparkles, CheckCircle, Users } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Code,
      title: 'AI-Powered Generation',
      description: 'Describe your backend in natural language and let AI generate the complete specification with all the code you need.',
      gradient: 'from-purple-500 to-pink-500',
      benefits: ['Natural language input', 'Intelligent code generation', 'Best practices included']
    },
    {
      icon: Database,
      title: 'Multiple Stacks',
      description: 'Support for Node.js (Express + Prisma) and Python (FastAPI + SQLModel) with PostgreSQL.',
      gradient: 'from-blue-500 to-cyan-500',
      benefits: ['Node.js & Python', 'Modern frameworks', 'Production-ready ORMs']
    },
    {
      icon: Shield,
      title: 'Production Ready',
      description: 'Generated backends include authentication, validation, Docker, and CI/CD pipelines.',
      gradient: 'from-green-500 to-emerald-500',
      benefits: ['JWT authentication', 'Input validation', 'Docker & CI/CD']
    },
    {
      icon: Rocket,
      title: 'One-Click Deploy',
      description: 'Deploy your generated backend to Railway, Render, or any cloud platform.',
      gradient: 'from-orange-500 to-red-500',
      benefits: ['Cloud deployment', 'Environment config', 'Auto-scaling ready']
    },
  ]

  const stats = [
    { number: '100%', label: 'AI-Powered', description: 'No manual coding required' },
    { number: '2', label: 'Language Stacks', description: 'Node.js & Python support' },
    { number: '∞', label: 'Possibilities', description: 'Unlimited backend ideas' },
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
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full text-sm font-medium mb-8 border border-primary-200 shadow-soft animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>LAUNCHING 2025</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-display font-bold text-neutral-900 mb-8 leading-tight animate-slide-up">
              Generate Production-Ready
              <span className="block text-gradient">
                Backends
              </span>
              with AI
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Describe your backend requirements in plain English and get a complete, deployable project 
              with authentication, database models, API endpoints, and deployment configuration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-scale-in">
              <Link
                to="/generate"
                className="btn-primary btn-lg group"
              >
                <span>Start Generating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-lg"
              >
                View on GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl font-display font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
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

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From simple APIs to complex microservices, EaseArch generates production-ready code with modern best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group card-hover">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4 group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-6 group-hover:text-neutral-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-3 text-sm text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Three simple steps to get your backend up and running
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <span className="text-3xl font-display font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">Describe Your Needs</h3>
              <p className="text-neutral-600">Tell us what you want to build in plain English</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <span className="text-3xl font-display font-bold text-secondary-600">2</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">AI Generates Code</h3>
              <p className="text-neutral-600">Our AI creates a complete backend specification</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <span className="text-3xl font-display font-bold text-accent-600">3</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">Deploy & Scale</h3>
              <p className="text-neutral-600">Generate files and deploy to your preferred platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              See what developers are saying about EaseArch
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-hover">
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
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Build Your Backend?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join the future of backend development. Generate, customize, and deploy in minutes, not hours.
          </p>
          <Link 
            to="/generate" 
            className="btn-secondary btn-lg group"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
}
