import { useState } from 'react'
import { Download, FolderOpen, Loader2, CheckCircle, ArrowRight } from 'lucide-react'
import { BackendSpec } from '../contexts/BackendSpecContext'

interface ScaffoldButtonProps {
  spec: BackendSpec
  onScaffoldStart: () => void
  onScaffoldComplete: (result: { success: boolean; message: string; localPath?: string }) => void
  isScaffolding: boolean
}

export default function ScaffoldButton({
  spec,
  onScaffoldStart,
  onScaffoldComplete,
  isScaffolding,
}: ScaffoldButtonProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleScaffold = async () => {
    onScaffoldStart()

    try {
      const response = await fetch('https://v0-coder.onrender.com/api/scaffold', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spec }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to scaffold project')
      }

      // Check if response is a zip file
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/zip')) {
        // Create blob and download
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        
        // Get filename from Content-Disposition header
        const contentDisposition = response.headers.get('content-disposition')
        let filename = `${getProjectName()}.zip`
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/)
          if (filenameMatch) {
            filename = filenameMatch[1]
          }
        }
        
        // Create download link and trigger download
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        setDownloadUrl(url)
        
        
        onScaffoldComplete({
          success: true,
          message: 'Project downloaded successfully!',
        })
      } else {
        throw new Error('Invalid response format from server')
      }
    } catch (error) {
      onScaffoldComplete({
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      })
    }
  }

  const getProjectName = () => {
    return spec.name || `backend-${spec.stack.language}-${Date.now()}`
  }

  return (
    <div className="space-y-8">
      {/* Main Action */}
      <div className="text-center">
        <button
          onClick={handleScaffold}
          disabled={isScaffolding}
          className="btn-primary btn-lg group"
        >
          {isScaffolding ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Generating Project...</span>
            </>
          ) : (
            <>
              <FolderOpen className="w-6 h-6" />
              <span>Generate Project Files</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>
      </div>

      {/* What You'll Get */}
      <div className="card-gradient border-primary-200">
        <h4 className="text-lg font-display font-semibold text-neutral-900 mb-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <span>What You'll Get</span>
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Complete project structure</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Package configuration</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Database schema & migrations</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>API routes & controllers</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Authentication middleware</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Docker configuration</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>CI/CD pipeline setup</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-700">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Environment configuration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card-gradient border-primary-200 bg-gradient-to-r from-primary-50/50 to-secondary-50/50">
        <h4 className="text-lg font-display font-semibold text-neutral-900 mb-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-primary-600" />
          </div>
          <span>Next Steps After Scaffolding</span>
        </h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 text-sm text-neutral-700">
            <span className="w-7 h-7 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <span>Navigate to the generated project directory</span>
          </div>
          <div className="flex items-start space-x-4 text-sm text-neutral-700">
            <span className="w-7 h-7 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <span>Install dependencies with <code className="bg-primary-100 px-2 py-1 rounded text-primary-800 font-mono text-xs">npm install</code> or <code className="bg-primary-100 px-2 py-1 rounded text-primary-800 font-mono text-xs">pip install -r requirements.txt</code></span>
          </div>
          <div className="flex items-start space-x-4 text-sm text-neutral-700">
            <span className="w-7 h-7 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <span>Set up your database and environment variables</span>
          </div>
          <div className="flex items-start space-x-4 text-sm text-neutral-700">
            <span className="w-7 h-7 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
            <span>Run the development server</span>
          </div>
          <div className="flex items-start space-x-4 text-sm text-neutral-700">
            <span className="w-7 h-7 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
            <span>Customize and extend as needed</span>
          </div>
        </div>
      </div>

      {/* Download Section (if available) */}
      {downloadUrl && (
        <div className="text-center">
          <a
            href={downloadUrl}
            download={`${getProjectName()}.zip`}
            className="btn-secondary"
          >
            <Download className="w-5 h-5" />
            <span>Download ZIP</span>
          </a>
        </div>
      )}
    </div>
  )
}
